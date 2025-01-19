import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";

import User from "../models/userModel.js";

/** @description Register a New User */
export const register = async (req, res, next) => {
  const { name, email, password, isGuest = false } = req.body;
  try {
    // Guest user
    if (isGuest) {
      // Validation
      if (!name) {
        return res.status(400).json({ error: "Please provide a name" });
      }

      // Create guest user
      const user = await User.create({ name, isGuest });
      return res
        .status(201)
        .json({ success: "Guest user created successfully", user });
    }

    // Registered user
    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all fields. [name, email & password]" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    // Response
    res.status(201).json({ success: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};

/** @description Login a User */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Check if password is correct
    const isMatch = compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Response
    res.status(200).json({ success: "User logged in successfully", token });
  } catch (error) {
    next(error);
  }
};
