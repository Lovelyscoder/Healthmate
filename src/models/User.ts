import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Patient } from "./patient";
import { Reminder } from "./Reminder"; 
import { History } from "./History"; 
import { Schedule } from "./Schedule"; 

@Entity("users")
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone_no!: string;

  @OneToMany(() => Patient, (patient) => patient.user)
  patients!: Patient[];

  // Add this relationship
  @OneToMany(() => Reminder, (reminder) => reminder.user)
  reminders!: Reminder[];
  @OneToMany(() => History, (history) => history.user)
  histories!: History[];
  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedulers: Schedule[];
}
