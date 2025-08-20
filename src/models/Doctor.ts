import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Schedule} from "./Schedule";
@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn()
  doctor_id!:number;
  @Column()
  name!:string
  @Column({unique:true})
  specialization!:string;
  @Column({unique:true})
  email!:string;
  @Column({nullable:true})
  phone!:string
  @OneToMany(()=>Schedule,(schedule)=>schedule.doctor)
  schedules!:Schedule[];
}