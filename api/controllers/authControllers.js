import User from "../models/userModels.js";
import bcrypt from "bcryptjs";

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
    next(err);
  }
};
