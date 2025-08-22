import { AppDataSource } from "../config/dbConfig";
import { Reminder } from "../models/Reminder";
import { plainToInstance } from "class-transformer";
import { CreateReminderDto, UpdateReminderDto } from "../dto/ReminderDto";

const reminderRepository = AppDataSource.getRepository(Reminder);

export class ReminderService {
  async create(createReminderDto: CreateReminderDto): Promise<Reminder> {
    const reminder = plainToInstance(Reminder, createReminderDto );
    return await reminderRepository.save(reminder);
  }

  async findAll(): Promise<Reminder[]> {
    return await reminderRepository.find({
      relations: ["prescription", "activity"],
    });
  }

  async findByPrescriptionId(prescriptionId: number): Promise<Reminder[]> {
    return await reminderRepository.find({
      where: { prescription: { id: prescriptionId } },
      relations: ["activity"],
    });
  }

  async findOne(id: number): Promise<Reminder | null> {
    return await reminderRepository.findOne({
      where: { id },
      relations: ["prescription", "activity"],
    });
  }

  async update(
    id: number,
    updateReminderDto: UpdateReminderDto
  ): Promise<Reminder | null> {
    const updatedReminder = plainToInstance(Reminder, updateReminderDto);
    await reminderRepository.update(id, updateReminderDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await reminderRepository.delete(id);
  }
}
