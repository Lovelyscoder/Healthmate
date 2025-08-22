import { Request, Response } from "express";
import { MedicineService } from "../services/medicineService";
import { CreateMedicineDto, UpdateMedicineDto } from "../dto/MedicineDto";
import { validate } from "class-validator";

const medicineService = new MedicineService();

export class MedicineController {
  async create(req: Request, res: Response) {
    try {
      const createMedicineDto = new CreateMedicineDto();
      Object.assign(createMedicineDto, req.body);

      const errors = await validate(createMedicineDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const medicine = await medicineService.create(createMedicineDto);
      return res.status(201).json(medicine);
    } catch (error) {
      return res.status(500).json({ message: "Error creating medicine" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const medicines = await medicineService.findAll();
      return res.json(medicines);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching medicines" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const medicine = await medicineService.findOne(parseInt(req.params.id));
      if (!medicine)
        return res.status(404).json({ message: "Medicine not found" });
      return res.json(medicine);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching medicine" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateMedicineDto = new UpdateMedicineDto();
      Object.assign(updateMedicineDto, req.body);

      const errors = await validate(updateMedicineDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const medicine = await medicineService.update(
        parseInt(req.params.id),
        updateMedicineDto
      );
      if (!medicine)
        return res.status(404).json({ message: "Medicine not found" });
      return res.json(medicine);
    } catch (error) {
      return res.status(500).json({ message: "Error updating medicine" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await medicineService.delete(parseInt(req.params.id));
      return res.json({ message: "Medicine deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting medicine" });
    }
  }
}
