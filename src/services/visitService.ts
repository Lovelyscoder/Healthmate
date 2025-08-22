import { AppDataSource } from "../config/dbConfig";
import { Visit } from "../models/Visit";
import { CreateVisitDto, UpdateVisitDto } from "../dto/VisitDto";

const visitRepository = AppDataSource.getRepository(Visit);

export class VisitService {
  async create(createVisitDto: CreateVisitDto): Promise<Visit> {
    const visit = visitRepository.create(createVisitDto);
    return await visitRepository.save(visit);
  }

  async findAll(): Promise<Visit[]> {
    return await visitRepository.find({
      relations: ["doctor", "patient", "prescriptions"],
    });
  }

  async findByPatientId(patientId: number): Promise<Visit[]> {
    return await visitRepository.find({
      where: { patient: { id: patientId } },
      relations: ["doctor", "prescriptions"],
    });
  }

  async findOne(id: number): Promise<Visit | null> {
    return await visitRepository.findOne({
      where: { id },
      relations: ["doctor", "patient", "prescriptions"],
    });
  }

  async update(
    id: number,
    updateVisitDto: UpdateVisitDto
  ): Promise<Visit | null> {
    await visitRepository.update(id, updateVisitDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await visitRepository.delete(id);
  }
}
