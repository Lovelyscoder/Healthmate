import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reminder } from "./Reminder";
import { History } from "./History";
import { MedicalInfo } from "./MedicalInfo";
import { Schedule } from "./Schedule";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ nullable: true })
  email!: string;
  @Column()
  password!: string;
  @Column({ nullable: true })
  age!: number;
  @Column({ type: "enum", enum: ["Male", "Female", "Other"], nullable: true })
  gender!: string;
  @OneToMany(() => Reminder, (reminder) => reminder.user)
  reminders!: Reminder[];
  @OneToMany(() => History, (history) => history.user)
  history!: History[];
  @OneToMany(() => MedicalInfo, (medicalInfo) => medicalInfo.user)
  medicalInfo!: MedicalInfo[];
  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedulers!: Schedule[];
}
