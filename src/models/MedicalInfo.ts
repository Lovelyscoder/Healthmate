import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import {User} from "./User";

@Entity("medical_Info")
export class MedicalInfo{
  @PrimaryGeneratedColumn()
  record_id:number;
  @Column({type:"text",nullable:true})
  diagnosis!:string;
  @Column(({type:"text",nullable:true}))
  prescription!:string
  @Column({nullable:true})
  report_file!:string
  @ManyToOne(()=>User,(user)=>user.medicalInfo,{onDelete:"CASCADE"})
  user!:User;
}
