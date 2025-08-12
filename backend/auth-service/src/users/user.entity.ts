import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: number;             // ID tự tăng
  @Column({ unique: true }) email: string;          // Cột email, duy nhất
  @Column() password: string;                       // Password (băm)
  @Column() fullName: string;                       // Họ tên
}
