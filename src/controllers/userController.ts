import { Request, Response } from "express";
import { AppDataSource } from "../config/dbConfig";
import { User } from "../models/User";
import { CreateUserDto, UpdateUserDto } from "../dto/user_dto";
import { validate } from "Class-validator";
import { plainToInstance } from "class-transformer";

const userRepository = AppDataSource.getRepository(User);
//Get all users

export const getUsers = async(req: Request, res:Response) =>{
  try {
    const users = await userRepository.find();
    return res.json(users);
  }catch(error){
    return res.status(500).json({message: "Error fetching users",error});
  }
};
//Get user by Id
export const getUserById = async(req: Request, res:Response) =>{
  try {
    const user =await userRepository.findOneBy({id:parseInt(req.params.id)});
    if (!user){
      return res.status(404).json({ message: "user not found"});
    }
    return res.json(user);
  }
  catch (error){
    return res.status(500).json({message:"Error fetching user",error});
  }
};

// Create user
export const createUser = async (req: Request, res: Response) => {
  try {
    //Request body ko DTO me convert karna
    const userDto = plainToInstance(CreateUserDto, req.body);

    //Validate chalana
    const errors = await validate(userDto);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    //User create & save
    const user = userRepository.create(userDto);
    const savedUser = await userRepository.save(user);

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

//Update user

export const upDateUser = async (req: Request,res:Response) =>{
  try{
    const userDto = plainToInstance(UpdateUserDto, req.body);
    const error = await validate(userDto);
    if (error.length > 0){
      const errorMessage = error.map(err => Object.values(err.constraints || {})).flat();
      return res.status(400).json({errors: errorMessage});
    }
    const user = await userRepository.findOneBy({id: parseInt(req.params.id)});
    if (!user){
      return res.status(404).json({message:"User not found"});
    }
    Object.assign(user ,userDto);
    const UpdatedUser =await userRepository.save(user);
    return res.json(UpdatedUser);
  }catch (error){
    return res.status(500).json({message:"Error updating user", error});
  }
};


// Delete user
export const deleteUser = async (req: Request, res:Response) =>{
  try{
    const result = await userRepository.delete(req.params.id);
    if(result.affected ===0){
        return res.status(404).json({message:"User not found"});

    }
    return res.json({message:"User deleted successfully"});
  }catch (error){
    return res.status(500).json({message:"Error deleting user",error});
    }
}


//   try {
//     const { name, email } = req.body;
//     if (!name) {
//       return res.status(400).json({ message: "Name is required" });
//     }
//     const user = userRepository.create({ name, email });
//     const saveUser = await userRepository.save(user);
//     res.status(200).json(saveUser);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user", error });
//   }
// };
