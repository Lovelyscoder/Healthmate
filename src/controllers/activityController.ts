import { Request, Response } from "express";
import { ActivityService } from "../services/activityService";
import { CreateActivityDto, UpdateActivityDto } from "../dto/ActivityDto";
import { validate } from "class-validator";

const activityService = new ActivityService();

export class ActivityController {
  async create(req: Request, res: Response) {
    try {
      const createActivityDto = new CreateActivityDto();
      Object.assign(createActivityDto, req.body);

      const errors = await validate(createActivityDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const activity = await activityService.create(createActivityDto);
      return res.status(201).json(activity);
    } catch (error) {
      return res.status(500).json({ message: "Error creating activity" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const activities = await activityService.findAll();
      return res.json(activities);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching activities" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const activity = await activityService.findOne(parseInt(req.params.id));
      if (!activity)
        return res.status(404).json({ message: "Activity not found" });
      return res.json(activity);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching activity" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateActivityDto = new UpdateActivityDto();
      Object.assign(updateActivityDto, req.body);

      const errors = await validate(updateActivityDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const activity = await activityService.update(
        parseInt(req.params.id),
        updateActivityDto
      );
      if (!activity)
        return res.status(404).json({ message: "Activity not found" });
      return res.json(activity);
    } catch (error) {
      return res.status(500).json({ message: "Error updating activity" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await activityService.delete(parseInt(req.params.id));
      return res.json({ message: "Activity deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting activity" });
    }
  }
}
