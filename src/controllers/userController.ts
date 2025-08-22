import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { CreateUserDto, UpdateUserDto } from "../dto/UserDto";
import { validate } from "class-validator";

const userService = new UserService();

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const createUserDto = new CreateUserDto();
            Object.assign(createUserDto, req.body);

            const errors = await validate(createUserDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const user = await userService.create(createUserDto);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Error creating user" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const users = await userService.findAll();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching users" });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const user = await userService.findOne(parseInt(req.params.id));
            if (!user) return res.status(404).json({ message: "User not found" });
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching user" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updateUserDto = new UpdateUserDto();
            Object.assign(updateUserDto, req.body);

            const errors = await validate(updateUserDto);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const user = await userService.update(parseInt(req.params.id), updateUserDto);
            if (!user) return res.status(404).json({ message: "User not found" });
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: "Error updating user" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await userService.delete(parseInt(req.params.id));
            return res.json({ message: "User deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting user" });
        }
    }
}