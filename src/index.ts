import "reflect-metadata";
import express, { Request, Response } from "express";
import { connectDB } from "./db";
import { AppDataSource } from "./config/dbConfig";
import userroute from "./routes/userroute";
import { appConfig } from "./config/appConfig";
//create an express application
const app = express();
app.use(express.json());

// Connect Database
 connectDB();
 console.log("Database connected");

//Routes
 app.use("/users", userroute);

//Start Server    
 app.listen(appConfig.port, () => {
      console.log("Server running on prot", appConfig.port);
    });
 