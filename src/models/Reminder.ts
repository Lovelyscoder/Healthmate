import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("reminders")
export class Reminder {
  @PrimaryGeneratedColumn()
  reminder_id: number;
  @Column()
  messsage!: string;
  @Column({ type: "datetime" })
  reminder_time: Date;
  @Column({ type: "enum", enum: ["pending", "Completea"], default: "Pending" })
  status!: string;
  @ManyToOne(() => User, (user) => user.reminders, { onDelete: "CASCADE" })
  user!: User;
}
