import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  // console.log(req.body);
  const { email, password, ...otherDetails } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    // if (user) next(createError(400, "User or Email already exit."));
    if (user) throw Error("user is already in use");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hash,
      ...otherDetails,
    });

    res.status(200).send("User has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    // jab bhi hum find method use karte hai to ek [...] mitlta hai.
    if (!user) next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      next(createError(404, "Wrong Username or Passwrod"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { isAdmin, password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};
