import {
  IsEmail,
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
} from "class-validator";

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  gender: string;

  @IsString()
  phone_no: string;

  @IsString()
  blood_group: string;

  @IsDate()
  dob: Date;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  relation: string;

  @IsNumber()
  userId: number;
}

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  phone_no?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;
}
