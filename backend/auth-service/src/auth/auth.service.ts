import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,   // Inject UsersService to manipulate with DB
    private jwtService: JwtService,       // Inject JWT service to create token
    private http: HttpService,          // Inject HttpService to call other services
  ) {}
  // Xử lý đăng ký tài khoản
  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);  // Hash the password
    const user = await this.usersService.create({ ...dto, password: hashed });

    // Call user-service to create profile
    const url = `${process.env.USER_SERVICE_URL}/users/profile`;
    const payload = { userId: user.id, fullName: dto.fullName, email: user.email };

    try {
      await firstValueFrom(
        this.http.post(url, payload, {
          headers: { 'x-internal-key': process.env.INTERNAL_KEY! },
        }).pipe(
          timeout(5000),
          catchError((err: AxiosError) => { throw err; }),
        ),
      );
    } catch (e) {
      // Do not block sign-up if profile creation fails. Log & move on (or enqueue for retry).
       console.error('Create profile failed:', (e as any)?.response?.data || e.message);
    }
    
    return { id: user.id, email: user.email };           // Trả về info cơ bản
  }

  // Xác thực người dùng khi đăng nhập
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);   // Tìm theo email
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(password, user.password); // So sánh mật khẩu
    if (!valid) throw new UnauthorizedException('Wrong password');

    return user;
  }

  // Xử lý đăng nhập và trả về token
  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password); // Xác thực user
    const payload = { sub: user.id, email: user.email };           // Payload JWT
    return { access_token: this.jwtService.sign(payload) };        // Tạo JWT
  }
}
