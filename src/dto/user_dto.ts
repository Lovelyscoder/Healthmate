import {IsEmail, IsOptional, IsString } from "Class-validator";

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail({}, {message:"Invalid email format"})
  @IsOptional()
  email?: string;
}


