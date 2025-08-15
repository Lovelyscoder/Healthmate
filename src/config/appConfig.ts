import dotenv from "dotenv";
dotenv.config();

export const appConfig = {
  port: Number(process.env.PORT) || 3000,
};
