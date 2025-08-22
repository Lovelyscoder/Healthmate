import "reflect-metadata";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import { userRouter } from "./routes/userRoutes";
import { patientRouter } from "./routes/patientRoutes";
import { doctorRouter } from "./routes/doctorRoutes";
import { visitRouter } from "./routes/visitRoutes";
import { prescriptionRouter } from "./routes/prescriptionRoutes";
import { authRouter } from "./routes/authRoutes";
import { reminderRouter } from "./routes/reminderRoutes";
import { diseaseRouter } from "./routes/diseaseRoutes";
import { appConfig } from "./config/appConfig";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database (ensure connectDB awaits AppDataSource.initialize)
connectDB();
console.log("Database connected");

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/patients", patientRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/visits", visitRouter);
app.use("/api/prescriptions", prescriptionRouter);
app.use("/api/reminders", reminderRouter);
app.use("/api/diseases", diseaseRouter);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

// Start Server
app.listen(appConfig.port, () => {
  console.log(`Server running on port ${appConfig.port}`);
});
