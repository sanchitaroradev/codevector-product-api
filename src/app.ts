import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeVector Product API is running."
  });
});

export default app;