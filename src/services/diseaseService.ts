import { AppDataSource } from "../config/dbConfig";
import { Disease } from "../models/Disease";
import { CreateDiseaseDto, UpdateDiseaseDto } from "../dto/DiseaseDto";

const diseaseRepository = AppDataSource.getRepository(Disease);

export class DiseaseService {
    async create(createDiseaseDto: CreateDiseaseDto): Promise<Disease> {
        const disease = diseaseRepository.create(createDiseaseDto);
        return await diseaseRepository.save(disease);
    }

    async findAll(): Promise<Disease[]> {
        return await diseaseRepository.find({
            relations: ['patients']
        });
    }

    async findOne(id: number): Promise<Disease | null> {
        return await diseaseRepository.findOne({
            where: { id },
            relations: ['patients']
        });
    }

    async update(id: number, updateDiseaseDto: UpdateDiseaseDto): Promise<Disease | null> {
        await diseaseRepository.update(id, updateDiseaseDto);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await diseaseRepository.delete(id);
    }
}