import "reflect-metadata";
import express, { Request, Response } from "express";
import { connectDB } from "./db";
import { AppDataSource } from "./config/dbConfig";
import userroute from "./routes/userroute";
import { appConfig } from "./config/appConfig";
//create an express application
const app = express();
app.use(express.json());

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected");

    app.use("/users", userroute);
    
    app.listen(appConfig.port, () => {
      console.log("Server running on prot", appConfig.port);
    });
  } catch (err) {
    console.error("Failed", err);
  }
})();
