import express from "express";
const app = express();

app.use(express.json());

import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

// Imports
import authRoutes from "./Routes/auth.js";
import usersRoutes from "./Routes/users.js";
import expenseRoutes from "./Routes/expenses.js";

import mongoose from "mongoose";
import { notFound } from "./middlewares/notFound.js";
import { loggers } from "./middlewares/loggers.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

import { limiter } from "./middlewares/rateLimiter.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(limiter);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/expenses", expenseRoutes);

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js";

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Server Api is running....😊",
  });
});

// Server for frontend app
// if (process.env.NODE_ENV === "production") {
//   const _dirname = path.dirname(fileURLToPath(import.meta.url));

//   app.use(express.static(path.join(_dirname, "../frontend/dist")));

//   // serve the frontend app
//   app.use(/.*/, (req, res) => {
//     res.send(path.join(_dirname, '..', 'frontend', 'dist', 'index.html'))
//   })

// }

if (process.env.NODE_ENV === "production") {
  const _dirname = path.dirname(fileURLToPath(import.meta.url));

  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(_dirname, "../frontend/dist/index.html"));
  });
}

// Error handles
app.use(loggers);
app.use(notFound);
app.use(globalErrorHandler);

mongoose
  .connect(
    process.env.NODE_ENV == "development"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRO,
  )
  .then(() => console.log("connection Successfull"))
  .catch((err) => console.log("connection Failed: ", err));

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
