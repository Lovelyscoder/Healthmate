import { Request, Response } from "express";
import { VisitService } from "../services/visitService";
import { CreateVisitDto, UpdateVisitDto } from "../dto/VisitDto";
import { validate } from "class-validator";

const visitService = new VisitService();

export class VisitController {
    async create(req: Request, res: Response) {
        try {
            const createVisitDto = new CreateVisitDto();
            Object.assign(createVisitDto, req.body);

            const errors = await validate(createVisitDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const visit = await visitService.create(createVisitDto);
            return res.status(201).json(visit);
        } catch (error) {
            return res.status(500).json({ message: "Error creating visit" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const visits = await visitService.findAll();
            return res.json(visits);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching visits" });
        }
    }

    async findByPatientId(req: Request, res: Response) {
        try {
            const visits = await visitService.findByPatientId(parseInt(req.params.patientId));
            return res.json(visits);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching visits" });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const visit = await visitService.findOne(parseInt(req.params.id));
            if (!visit) return res.status(404).json({ message: "Visit not found" });
            return res.json(visit);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching visit" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updateVisitDto = new UpdateVisitDto();
            Object.assign(updateVisitDto, req.body);

            const errors = await validate(updateVisitDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const visit = await visitService.update(parseInt(req.params.id), updateVisitDto);
            if (!visit) return res.status(404).json({ message: "Visit not found" });
            return res.json(visit);
        } catch (error) {
            return res.status(500).json({ message: "Error updating visit" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await visitService.delete(parseInt(req.params.id));
            return res.json({ message: "Visit deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting visit" });
        }
    }
}