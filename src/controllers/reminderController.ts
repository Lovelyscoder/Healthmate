import { Request, Response } from "express";
import { ReminderService } from "../services/reminderService";
import { CreateReminderDto, UpdateReminderDto } from "../dto/ReminderDto";
import { validate } from "class-validator";

const reminderService = new ReminderService();

export class ReminderController {
  async create(req: Request, res: Response) {
    try {
      const createReminderDto = new CreateReminderDto();
      Object.assign(createReminderDto, req.body);

      const errors = await validate(createReminderDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const reminder = await reminderService.create(createReminderDto);
      return res.status(201).json(reminder);
    } catch (error) {
      return res.status(500).json({ message: "Error creating reminder" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const reminders = await reminderService.findAll();
      return res.json(reminders);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching reminders" });
    }
  }

  async findByPrescriptionId(req: Request, res: Response) {
    try {
      const reminders = await reminderService.findByPrescriptionId(
        parseInt(req.params.prescriptionId)
      );
      return res.json(reminders);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching reminders" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateReminderDto = new UpdateReminderDto();
      Object.assign(updateReminderDto, req.body);

      const errors = await validate(updateReminderDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const reminder = await reminderService.update(
        parseInt(req.params.id),
        updateReminderDto
      );
      if (!reminder)
        return res.status(404).json({ message: "Reminder not found" });
      return res.json(reminder);
    } catch (error) {
      return res.status(500).json({ message: "Error updating reminder" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await reminderService.delete(parseInt(req.params.id));
      return res.json({ message: "Reminder deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting reminder" });
    }
  }
}
