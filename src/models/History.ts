import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("history")
export class History{
  @PrimaryGeneratedColumn()
  history_id!:number;
  @Column({nullable:true})
  action!:String;
  @Column({type:"text",nullable:true})
  details!:string;
  @ManyToOne(() => User, (user) => user.histories, { onDelete: "CASCADE" })
   user!: User;
}