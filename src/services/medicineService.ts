import { AppDataSource } from "../config/dbConfig";
import { Medicine } from "../models/Medicine";
import { CreateMedicineDto, UpdateMedicineDto } from "../dto/MedicineDto";

const medicineRepository = AppDataSource.getRepository(Medicine);

export class MedicineService {
    async create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
        const medicine = medicineRepository.create(createMedicineDto);
        return await medicineRepository.save(medicine);
    }

    async findAll(): Promise<Medicine[]> {
        return await medicineRepository.find();
    }

    async findOne(id: number): Promise<Medicine | null> {
        return await medicineRepository.findOne({ where: { id } });
    }

    async update(id: number, updateMedicineDto: UpdateMedicineDto): Promise<Medicine | null> {
        await medicineRepository.update(id, updateMedicineDto);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await medicineRepository.delete(id);
    }
}