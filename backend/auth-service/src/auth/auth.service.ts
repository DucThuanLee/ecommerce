import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,   // Inject UsersService để thao tác với DB
    private jwtService: JwtService,       // Inject JWT service để tạo token
  ) {}
  // Xử lý đăng ký tài khoản
  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);  // Hash the password
    const user = await this.usersService.create({ ...dto, password: hashed });
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
