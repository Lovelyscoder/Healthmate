import { AppDataSource } from "../config/dbConfig";
import { Patient } from "../models/patient";
import { CreatePatientDto, UpdatePatientDto } from "../dto/patientDto";
import bcrypt from "bcrypt";

const patientRepository = AppDataSource.getRepository(Patient);

export class PatientService {
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const hashedPassword = await bcrypt.hash(createPatientDto.password, 10);
    const patient = patientRepository.create({
      ...createPatientDto,
      password: hashedPassword,
    });
    return await patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return await patientRepository.find({
      relations: ["user", "diseases", "visits"],
    });
  }

  async findByUserId(userId: number): Promise<Patient[]> {
    return await patientRepository.find({
      where: { user: { id: userId } },
      relations: ["diseases", "visits"],
    });
  }

  async findOne(id: number): Promise<Patient | null> {
    return await patientRepository.findOne({
      where: { id },
      relations: ["user", "diseases", "visits"],
    });
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto
  ): Promise<Patient | null> {
    await patientRepository.update(id, updatePatientDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await patientRepository.delete(id);
  }
}
