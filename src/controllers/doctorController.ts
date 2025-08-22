import { Request, Response } from "express";
import { DoctorService } from "../services/doctorService";
import { CreateDoctorDto, UpdateDoctorDto } from "../dto/DoctorDto";
import { validate } from "class-validator";

const doctorService = new DoctorService();

export class DoctorController {
  async create(req: Request, res: Response) {
    try {
      const createDoctorDto = new CreateDoctorDto();
      Object.assign(createDoctorDto, req.body);

      const errors = await validate(createDoctorDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const doctor = await doctorService.create(createDoctorDto);
      return res.status(201).json(doctor);
    } catch (error) {
      return res.status(500).json({ message: "Error creating doctor" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const doctors = await doctorService.findAll();
      return res.json(doctors);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching doctors" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const doctor = await doctorService.findOne(parseInt(req.params.id));
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });
      return res.json(doctor);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching doctor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateDoctorDto = new UpdateDoctorDto();
      Object.assign(updateDoctorDto, req.body);

      const errors = await validate(updateDoctorDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const doctor = await doctorService.update(
        parseInt(req.params.id),
        updateDoctorDto
      );
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });
      return res.json(doctor);
    } catch (error) {
      return res.status(500).json({ message: "Error updating doctor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await doctorService.delete(parseInt(req.params.id));
      return res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting doctor" });
    }
  }
}
