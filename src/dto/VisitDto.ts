import { IsDate, IsString, IsNumber } from "class-validator";

export class CreateVisitDto {
  @IsDate()
  visit_date: Date;

  @IsString()
  reason: string;

  @IsString()
  notes: string;

  @IsNumber()
  doctorId: number;

  @IsNumber()
  patientId: number;
}

export class UpdateVisitDto {
  @IsString()
  notes?: string;

  @IsString()
  reason?: string;
}
