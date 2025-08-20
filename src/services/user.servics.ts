import { AppDataSource } from "../config/dbConfig";
import { User } from "../models/User";
import { CreateUserDto, UpdateUserDto } from "../dto/user_dto";
import { validate } from "Class-validator";
import { plainToInstance } from "class-transformer";
import { hashPassword } from "../utils/password.util";


const userRepository = AppDataSource.getRepository(User);

export class UserService {

  //-----------------------Get all users------------------
  async getUsers() {
    return await userRepository.find();
  }

  //------------------------Get user by ID-----------------
  async getUserById(id: number) {
    return await userRepository.findOneBy({ id });
  }


  //---------------------Create user---------------
  async createUser(userData: any) {
    //Request body ko DTO me convert karna
    const userDto = plainToInstance(CreateUserDto, userData);

    //Validate chalana
    const errors = await validate(userDto);
    if (errors.length > 0) {
      throw{status:400,message: "Validation failed", errors };
    }

    //User create & save
    const user = userRepository.create(userDto);

    return await userRepository.save(user);
  }

  //-----------------update user-----------------------
  async updateUser(id: number, updateData: any) {
    const user = await userRepository.findOneBy({ id });
    if (!user) return null;
    Object.assign(user, updateData);
    return await userRepository.save(user);
  }
  
  //-------------------Delete user---------------------
  async deleteUser(id: number) {
    return await userRepository.delete(id);
  }
}
