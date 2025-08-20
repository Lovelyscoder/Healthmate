import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import { Doctor } from "./Doctor";

@Entity("schedules")
export class Schedule{
  @PrimaryGeneratedColumn()
  schedule_id!:number;
  @Column({type:"datetime"})
  appointment_date:Date;
  @Column({type:"enum",enum:["Scheduled","Completed","Cancelled"],default:"Scheduled"})
  status!:string;
  @ManyToOne(()=>User,(user)=>user.schedulers,{onDelete:"CASCADE"})
  user!:User;
  @ManyToOne(()=>Doctor,(doctor)=>doctor.schedules,{onDelete:"CASCADE"})
   doctor!:Doctor;
}