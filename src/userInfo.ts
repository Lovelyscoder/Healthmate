import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import userroute from "./routes/userroute";

dotenv.config();

const user: Express = express();
const port = parseInt(process.env.PORT || "3000", 10);

user.use(express.json());
user.use(bodyparser.urlencoded({ extended: true }));

user.use("/api/v2", userroute);

user.listen(port, () => {
  console.log("working", port);
});
