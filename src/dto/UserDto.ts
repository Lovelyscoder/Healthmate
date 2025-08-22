import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phone_no: string;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(2)
  name?: string;

  @IsString()
  phone_no?: string;
}

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  phone_no: string;
  createdAt: Date;
}
