import express from "express";
const app = express();

app.use(express.json());

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
import helmet from "helmet"
import morgan from "morgan";
import cors from 'cors'

app.use(helmet())
app.use(cors())

if(process.env.MODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// app.use(limiter)

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/expenses", expenseRoutes);


import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.get('/', (req, res) => {
  res.status(200).json({
    message: "Expense Api is running"
  })
})


// Error handles
app.use(loggers);
app.use(notFound);
app.use(globalErrorHandler);

mongoose
  .connect(
    process.env.MODE_ENV == "development"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRO,
  )
  .then(() => console.log("connection Successfull"))
  .catch((err) => console.log("connection Failed: ", err));

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
