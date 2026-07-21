import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import authorization from "./middlewares/authorization.js";

import { swaggerUi, specs } from "./config/swagger.js";

// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Enable the JSON body parsing for incoming requests
app.use(cors());
app.use(express.urlencoded({ extended: true }))

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", userRoutes);

// simple route
app.get("/", (req, res) => {
  res.send("API is running... <a href='/api-docs'>View API documentation</a>");
});

// routes
app.use("/", authorization);
app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/class", classRoutes);
app.use("/membership", membershipRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});