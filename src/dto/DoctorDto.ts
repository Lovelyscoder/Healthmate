import { IsString, IsNotEmpty } from "class-validator";

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsString()
  @IsNotEmpty()
  phone_no: string;
}

export class UpdateDoctorDto {
  @IsString()
  @IsNotEmpty()
  location?: string;

  @IsString()
  @IsNotEmpty()
  phone_no?: string;
}
