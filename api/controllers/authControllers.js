import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// sign-up
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

// sign-in
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email }); //.lean()
    // console.log("<><><>", validUser);

    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "wrong credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hr

    res
      .cookie("access_token", token, { httpOnly: true, expiry: expiryDate })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
