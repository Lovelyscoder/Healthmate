// src/config/dbConfig.ts
import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config();
export const AppDataSource = new DataSource({
  
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "Healthmate",
  synchronize: false,
  logging: false,
  entities: ["src/models/**/*.{ts,js}"],
  migrations: ["src/migration/**/*.{ts,js}"],
  subscribers: [],
});
