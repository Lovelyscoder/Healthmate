import { Entity, Column, ManyToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Patient } from "./patient";

@Entity("diseases")
export class Disease extends BaseEntity {
    @Column()
    name: string;

    @Column("text", { array: true })
    symptoms: string[];

    @Column("text", { array: true })
    precautions: string[];

    @ManyToMany(() => Patient, patient => patient.diseases)
    patients: Patient[];
}