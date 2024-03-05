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

// server listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
});
