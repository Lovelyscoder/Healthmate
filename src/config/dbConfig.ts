//import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../models/User";
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
  entities: [User],
  synchronize: true,
  logging: false,
});
