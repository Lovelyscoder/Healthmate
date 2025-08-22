import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity("medicines")
export class Medicine extends BaseEntity {
    @Column()
    name: string;
}