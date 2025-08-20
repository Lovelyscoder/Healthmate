import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    const decoded = verifyToken(token);
    (req as any).user = decoded; //attach user data
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
