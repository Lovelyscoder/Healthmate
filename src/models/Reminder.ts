import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseEntity } from "./baseEntity";
import { User } from "./User";
import { Prescription } from "./Prescription";
import { Activity } from "./Activity";

export enum ReminderType {
  MEDICINE = "medicines",
  ACTIVITY = "activity",
}

export enum ReminderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  MISSED = "missed",
}

@Entity("reminders")
export class Reminder extends BaseEntity {
  @Column()
  message!: string;

  @Column({ type: "timestamp" })
  reminder_time!: Date;

  @Column({
    type: "enum",
    enum: ReminderStatus,
    default: ReminderStatus.PENDING,
  })
  status!: ReminderStatus;

  @ManyToOne(() => User, (user) => user.reminders, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Prescription, (prescription) => prescription.reminders, {
    nullable: false,
    onDelete: "CASCADE",
  })
  prescription!: Prescription;

  @Column({
    type: "enum",
    enum: ReminderType,
  })
  type!: ReminderType;

  @Column({ type: "timestamp" })
  date_time!: Date;

  @ManyToOne(() => Activity, {
    nullable: true,
    onDelete: "SET NULL",
  })
  activity?: Activity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
