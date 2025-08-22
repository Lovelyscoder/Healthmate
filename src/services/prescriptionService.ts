import { AppDataSource } from "../config/dbConfig";
import { Prescription } from "../models/Prescription";
import { CreatePrescriptionDto, UpdatePrescriptionDto } from "../dto/PrescriptionDto";

const prescriptionRepository = AppDataSource.getRepository(Prescription);

export class PrescriptionService {
    async create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription> {
        const prescription = prescriptionRepository.create(createPrescriptionDto);
        return await prescriptionRepository.save(prescription);
    }

    async findAll(): Promise<Prescription[]> {
        return await prescriptionRepository.find({
            relations: ['visit', 'medicine', 'reminders']
        });
    }

    async findByVisitId(visitId: number): Promise<Prescription[]> {
        return await prescriptionRepository.find({
            where: { visit: { id: visitId } },
            relations: ['medicine', 'reminders']
        });
    }

    async findOne(id: number): Promise<Prescription | null> {
        return await prescriptionRepository.findOne({
            where: { id },
            relations: ['visit', 'medicine', 'reminders']
        });
    }

    async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto): Promise<Prescription | null> {
        await prescriptionRepository.update(id, updatePrescriptionDto);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await prescriptionRepository.delete(id);
    }
}