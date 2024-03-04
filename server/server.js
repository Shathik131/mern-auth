import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
});
