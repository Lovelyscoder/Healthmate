//import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../models/User";
import { Doctor } from "../models/Doctor";
import { Reminder } from "../models/Reminder";
import { History } from "../models/History";
import { MedicalInfo } from "../models/MedicalInfo";
import { Schedule } from "../models/Schedule";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql" as const,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "", // Use an empty string for password if not set
  database: process.env.DB_NAME || "test_db",
  entities: [User,Doctor,Reminder,MedicalInfo,History,Schedule],
  synchronize: false,
  logging: true,
  migrations: ["src/migrations/*.ts"],
});
