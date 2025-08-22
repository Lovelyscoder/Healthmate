import { IsString, IsDate, IsEnum, IsNumber } from "class-validator";
import { ReminderStatus } from "../models/Reminder";

export enum ReminderType {
  MEDICINE = "medicines",
  ACTIVITY = "activity",
}

export class CreateReminderDto {
  @IsNumber()
  prescriptionId: number;

  @IsString()
  status: string;

  @IsEnum(ReminderType)
  type: ReminderType;

  @IsDate()
  date_time: Date;

  @IsNumber()
  activityId?: number;
}

export class UpdateReminderDto {
  @IsString()
  status?: ReminderStatus;

  @IsDate()
  date_time?: Date;
}
