import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Visit } from "./Visit";
import { Medicine } from "./Medicine";
import { Reminder } from "./Reminder";

@Entity("prescriptions")
export class Prescription extends BaseEntity {
    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    frequency: string;

    @ManyToOne(() => Visit, visit => visit.prescriptions)
    visit: Visit;

    @ManyToOne(() => Medicine)
    medicine: Medicine;

    @OneToMany(() => Reminder, reminder => reminder.prescription)
    reminders: Reminder[];
}