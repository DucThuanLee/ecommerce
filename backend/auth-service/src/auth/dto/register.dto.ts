import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail() email: string;                // Yêu cầu định dạng email
  @MinLength(6) password: string;          // Password tối thiểu 6 ký tự
  @IsNotEmpty() fullName: string;          // Không được để trống tên
}
