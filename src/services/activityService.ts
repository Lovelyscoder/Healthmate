import { AppDataSource } from "../config/dbConfig";
import { Activity } from "../models/Activity";
import { CreateActivityDto, UpdateActivityDto } from "../dto/ActivityDto";

const activityRepository = AppDataSource.getRepository(Activity);

export class ActivityService {
    async create(createActivityDto: CreateActivityDto): Promise<Activity> {
        const activity = activityRepository.create(createActivityDto);
        return await activityRepository.save(activity);
    }

    async findAll(): Promise<Activity[]> {
        return await activityRepository.find();
    }

    async findOne(id: number): Promise<Activity | null> {
        return await activityRepository.findOne({ where: { id } });
    }

    async update(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity | null> {
        await activityRepository.update(id, updateActivityDto);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await activityRepository.delete(id);
    }
}