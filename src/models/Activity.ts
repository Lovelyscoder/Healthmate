import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity("activities")
export class Activity extends BaseEntity {
    @Column()
    name: string;
}