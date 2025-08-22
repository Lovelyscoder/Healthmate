import { AppDataSource } from "../config/dbConfig";
import { User } from "../models/User";
import { CreateUserDto, UpdateUserDto } from "../dto/UserDto";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export class UserService {
    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = userRepository.create({
            ...createUserDto,
            password: hashedPassword
        });
        return await userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await userRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return await userRepository.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        await userRepository.update(id, updateUserDto);
        return await userRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await userRepository.delete(id);
    }
}