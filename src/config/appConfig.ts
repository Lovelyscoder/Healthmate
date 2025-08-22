import dotenv from "dotenv";
dotenv.config();

export const appConfig = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "@lovely",
  // ...other config options
};
