import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (err) {
    // default error handling
    // res.send("data error")
    // res.status(500).json({message: "something went wrong"})
    // next(err)

    // custom error handling
    next(errorHandler(300, "something went wrong"));
  }
};
