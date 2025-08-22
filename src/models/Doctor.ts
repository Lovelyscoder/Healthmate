import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Schedule } from "./Schedule";
import { Visit } from "./Visit";

@Entity("doctors")
export class Doctor extends BaseEntity {
  @Column()
  name!: string;
  @Column()
  location!: string;
  @Column()
  specialization!: string;
  @Column({ unique: true })
  email!: string;
  @Column({ nullable: true })
  phone!: string;
  @OneToMany(() => Schedule, (schedule) => schedule.doctor)
  schedules!: Schedule[];
  @OneToMany(() => Visit, (visit) => visit.doctor)
  visits: Visit[];
}
