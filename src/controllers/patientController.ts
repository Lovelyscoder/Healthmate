import { Request, Response } from "express";
import { PatientService } from "../services/patient.servics";
import { CreatePatientDto, UpdatePatientDto } from "../dto/patientDto";
import { validate } from "class-validator";
import { AuthRequest } from "../middleware/authMiddleware";

const patientService = new PatientService();

export class PatientController {
  async create(req: AuthRequest, res: Response) {
    try {
      const createPatientDto = new CreatePatientDto();
      Object.assign(createPatientDto, req.body);
      createPatientDto.userId = req.user!.id;

      const errors = await validate(createPatientDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const patient = await patientService.create(createPatientDto);
      return res.status(201).json(patient);
    } catch (error) {
      return res.status(500).json({ message: "Error creating patient" });
    }
  }

  async findAll(req: AuthRequest, res: Response) {
    try {
      const patients = await patientService.findByUserId(req.user!.id);
      return res.json(patients);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching patients" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const patient = await patientService.findOne(parseInt(req.params.id));
      if (!patient)
        return res.status(404).json({ message: "Patient not found" });
      return res.json(patient);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching patient" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatePatientDto = new UpdatePatientDto();
      Object.assign(updatePatientDto, req.body);

      const errors = await validate(updatePatientDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const patient = await patientService.update(
        parseInt(req.params.id),
        updatePatientDto
      );
      if (!patient)
        return res.status(404).json({ message: "Patient not found" });
      return res.json(patient);
    } catch (error) {
      return res.status(500).json({ message: "Error updating patient" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await patientService.delete(parseInt(req.params.id));
      return res.json({ message: "Patient deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting patient" });
    }
  }
}
