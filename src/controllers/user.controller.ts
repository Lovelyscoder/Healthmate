import { Request, Response } from "express";
import { AppDataSource } from "../config/dbConfig";
import { User } from "../models/User";

import { UserService } from "../services/user.servics";

const userRepository = AppDataSource.getRepository(User);
const userService =new UserService();
//Get all users

export const getUsers = async(req: Request, res:Response) =>{
  try {
    const users = await userService.getUsers();
    return res.json(users);
  }catch(error){
    return res.status(500).json({message: "Error fetching users",error});
  }
};
//Get user by Id
export const getUserById = async(req: Request, res:Response) =>{
  try {
    //const user =await userRepository.findOneBy({id:parseInt(req.params.id)});
    const user =await userService.getUserById(parseInt(req.params.id))
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
    const user=await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

//Update user

export const upDateUser = async (req: Request,res:Response) =>{
  try{
     const updatedUser =await userService.updateUser(parseInt(req.params.id),req.body)
      if (!updatedUser){
      return res.status(404).json({message:"User not found"});
    }
    return res.json(updatedUser);
  }catch (error){
    return res.status(500).json({message:"Error updating user", error});
  }
};


// Delete user
export const deleteUser = async (req: Request, res:Response) =>{
  try{
    const result = await userService.deleteUser(parseInt(req.params.id));
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
