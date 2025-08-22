import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig";

// Define the JWT payload interface
interface JwtPayload {
  id: number;
  email: string;
  // Add other properties that are included in your JWT token
}

// Extend Request interface to include user
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No auth token found" });
    }

    // Add type assertion for jwt.verify
    const decoded = jwt.verify(
      token,
      appConfig.jwtSecret as string
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(401).json({ message: "Please authenticate" });
  }
};
