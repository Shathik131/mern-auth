import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

// database start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("once", () => {
  console.log("database not connected");
});

db.once("open", () => {
  console.log("database connected successfully");
});

// express
const app = express();

//routes
app.use("/api/user", userRouter);

// server listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
});
