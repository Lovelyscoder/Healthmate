import { IsDate, IsString, IsNumber } from "class-validator";

export class CreatePrescriptionDto {
  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsString()
  frequency: string;

  @IsNumber()
  visitId: number;

  @IsNumber()
  medicineId: number;
}

export class UpdatePrescriptionDto {
  @IsDate()
  end_date?: Date;

  @IsString()
  frequency?: string;
}
