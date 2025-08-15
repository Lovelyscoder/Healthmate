import "reflect-metadata";
import { AppDataSource } from "./config/dbConfig";

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