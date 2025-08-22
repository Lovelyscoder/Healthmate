import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../config/dbConfig";
import { AuthRequest } from "../middleware/authMiddleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig";

const userRepository = AppDataSource.getRepository(User);

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name, phone_no } = req.body;

      // Check if user already exists
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = userRepository.create({
        email,
        password: hashedPassword,
        name,
        phone_no,
      });

      await userRepository.save(user);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        appConfig.jwtSecret as string,
        { expiresIn: "1d" }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in" });
    }
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await userRepository.findOne({
        where: { id: req.user?.id },
        select: ["id", "name", "email", "phone_no"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile" });
    }
  }

  async logout(req: AuthRequest, res: Response) {
    try {
      // In a stateless JWT setup, client handles token removal
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error logging out" });
    }
  }

  async changePassword(req: AuthRequest, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await userRepository.findOne({
        where: { id: req.user?.id },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      await userRepository.save(user);

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error changing password" });
    }
  }
}
