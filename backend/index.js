import dotenv from "dotenv";

import express from "express";
import cors from "cors";

import errorHandler from "./middleware/errorHandler.js";
import requestLogger from "./middleware/requestLogger.js";
import unknownEndpoint from "./middleware/unknownEndpoint.js";

import connectDB from "./config/db.js";

// Set up Express
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

connectDB();

// Set up Routes
app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});