import { Request, Response } from "express";
import { PrescriptionService } from "../services/prescriptionService";
import {
  CreatePrescriptionDto,
  UpdatePrescriptionDto,
} from "../dto/PrescriptionDto";
import { validate } from "class-validator";

const prescriptionService = new PrescriptionService();

export class PrescriptionController {
  async create(req: Request, res: Response) {
    try {
      const createPrescriptionDto = new CreatePrescriptionDto();
      Object.assign(createPrescriptionDto, req.body);

      const errors = await validate(createPrescriptionDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const prescription = await prescriptionService.create(
        createPrescriptionDto
      );
      return res.status(201).json(prescription);
    } catch (error) {
      return res.status(500).json({ message: "Error creating prescription" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const prescriptions = await prescriptionService.findAll();
      return res.json(prescriptions);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching prescriptions" });
    }
  }

  async findByVisitId(req: Request, res: Response) {
    try {
      const prescriptions = await prescriptionService.findByVisitId(
        parseInt(req.params.visitId)
      );
      return res.json(prescriptions);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching prescriptions" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const prescription = await prescriptionService.findOne(
        parseInt(req.params.id)
      );
      if (!prescription)
        return res.status(404).json({ message: "Prescription not found" });
      return res.json(prescription);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching prescription" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatePrescriptionDto = new UpdatePrescriptionDto();
      Object.assign(updatePrescriptionDto, req.body);

      const errors = await validate(updatePrescriptionDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const prescription = await prescriptionService.update(
        parseInt(req.params.id),
        updatePrescriptionDto
      );
      if (!prescription)
        return res.status(404).json({ message: "Prescription not found" });
      return res.json(prescription);
    } catch (error) {
      return res.status(500).json({ message: "Error updating prescription" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await prescriptionService.delete(parseInt(req.params.id));
      return res.json({ message: "Prescription deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting prescription" });
    }
  }
}
