import "reflect-metadata";
import { DataSource } from "typeorm";
import { AppDataSource } from "./config/dbConfig";
import { User } from "./models/User";

export const connectDB = async () =>{
  try{
    await AppDataSource.initialize();
    console.log("Database connected (typeorm)");
  }
  catch(error){
    console.error("db connection failed:",error);
    process.exit(1);
  }
};