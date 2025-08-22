import { AppDataSource } from "../config/dbConfig";
import { Doctor } from "../models/Doctor";
import { CreateDoctorDto, UpdateDoctorDto } from "../dto/DoctorDto";

const doctorRepository = AppDataSource.getRepository(Doctor);

export class DoctorService {
    async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctor = doctorRepository.create(createDoctorDto);
        return await doctorRepository.save(doctor);
    }

    async findAll(): Promise<Doctor[]> {
        return await doctorRepository.find({
            relations: ['visits']
        });
    }

    async findOne(id: number): Promise<Doctor | null> {
        return await doctorRepository.findOne({
            where: { id },
            relations: ['visits']
        });
    }

    async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor | null> {
        await doctorRepository.update(id, updateDoctorDto);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await doctorRepository.delete(id);
    }
}