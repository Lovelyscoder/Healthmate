import { Entity, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { User } from "./User";
import { Disease } from "./Disease";
import { Visit } from "./Visit";

@Entity("patients")
export class Patient extends BaseEntity {
    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column()
    phone_no: string;

    @Column()
    blood_group: string;

    @Column()
    dob: Date;

    @Column({ type: 'decimal' })
    height: number;

    @Column({ type: 'decimal' })
    weight: number;

    @Column({ nullable: true })
    image: string;

    @Column()
    relation: string;

    @ManyToOne(() => User, user => user.patients)
    user: User;

    @ManyToMany(() => Disease)
    @JoinTable({ name: 'patients_diseases' })
    diseases: Disease[];

    @OneToMany(() => Visit, visit => visit.patient)
    visits: Visit[];
}