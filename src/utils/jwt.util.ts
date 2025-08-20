import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

export const generateToken = (userId:number) => {
  return jwt.sign({userId}, JWT_SECRET, { expiresIn:"1h"});
};
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
