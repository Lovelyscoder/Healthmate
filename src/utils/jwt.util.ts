import jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig";

interface TokenPayload {
  id: number;
  email: string;
  // Add other payload properties as needed
}

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, appConfig.jwtSecret, { expiresIn: "1h" });
};
export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, appConfig.jwtSecret as string) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
