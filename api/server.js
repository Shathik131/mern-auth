import express from "express";
import mongoose from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";
dotenv.config();

// express
const app = express();
app.use(express.json());

//routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// server listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
});
