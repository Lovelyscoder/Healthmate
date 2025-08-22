import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Doctor } from "./Doctor";
import { Patient } from "./patient";
import { Prescription } from "./Prescription";

@Entity("visits")
export class Visit extends BaseEntity {
    @Column()
    visit_date: Date;

    @Column()
    reason: string;

    @Column()
    notes: string;

    @ManyToOne(() => Doctor, doctor => doctor.visits)
    doctor: Doctor;

    @ManyToOne(() => Patient, patient => patient.visits)
    patient: Patient;

    @OneToMany(() => Prescription, prescription => prescription.visit)
    prescriptions: Prescription[];
}