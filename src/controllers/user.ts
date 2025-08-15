import { Request, Response } from "express";
import { AppDataSource } from "../config/dbConfig";
import { User } from "../models/User";

//Fetch all user
const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (req: Request, res: Response) => {
  try {
    console.log("INside get users cont");
    const Users = await userRepository.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Add a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const user = userRepository.create({ name, email });
    const saveUser = await userRepository.save(user);
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
