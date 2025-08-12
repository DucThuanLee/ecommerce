import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,                 // Inject repository vào service
  ) {}

  create(data: Partial<User>) {
    const user = this.repo.create(data);           // Tạo entity User
    return this.repo.save(user);                   // Lưu vào DB
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } }); // Tìm user theo email
  }
}
