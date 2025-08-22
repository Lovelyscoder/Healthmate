import { IsString, IsNotEmpty } from "class-validator";

export class CreateMedicineDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateMedicineDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
