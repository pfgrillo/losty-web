import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
