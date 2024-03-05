import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
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

const app = express();

// server listening

const PORT = 3000;
// const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
});
