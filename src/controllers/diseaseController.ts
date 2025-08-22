import { Request, Response } from "express";
import { DiseaseService } from "../services/diseaseService";
import { CreateDiseaseDto, UpdateDiseaseDto } from "../dto/DiseaseDto";
import { validate } from "class-validator";

const diseaseService = new DiseaseService();

export class DiseaseController {
  async create(req: Request, res: Response) {
    try {
      const createDiseaseDto = new CreateDiseaseDto();
      Object.assign(createDiseaseDto, req.body);

      const errors = await validate(createDiseaseDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const disease = await diseaseService.create(createDiseaseDto);
      return res.status(201).json(disease);
    } catch (error) {
      return res.status(500).json({ message: "Error creating disease" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const diseases = await diseaseService.findAll();
      return res.json(diseases);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching diseases" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const disease = await diseaseService.findOne(parseInt(req.params.id));
      if (!disease)
        return res.status(404).json({ message: "Disease not found" });
      return res.json(disease);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching disease" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateDiseaseDto = new UpdateDiseaseDto();
      Object.assign(updateDiseaseDto, req.body);

      const errors = await validate(updateDiseaseDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const disease = await diseaseService.update(
        parseInt(req.params.id),
        updateDiseaseDto
      );
      if (!disease)
        return res.status(404).json({ message: "Disease not found" });
      return res.json(disease);
    } catch (error) {
      return res.status(500).json({ message: "Error updating disease" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await diseaseService.delete(parseInt(req.params.id));
      return res.json({ message: "Disease deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting disease" });
    }
  }
}
