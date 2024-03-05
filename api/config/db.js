import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "mern-auth"
});

const db = mongoose.connection;

db.on("once", () => {
  console.log("database not connected");
});

db.once("open", () => {
  console.log("database connected successfully");
});

export default db;
