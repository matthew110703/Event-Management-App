import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";

import User from "../models/userModel";

/** @description Register a New User */
export const register = async (req, res) => {
  const { name, email, password, isGuest = false } = req.body;

  try {
    // Validation
    if (isGuest) {
      if (!name) {
        return res.status(400).json({ error: "Please provide a name" });
      }

      // Create guest user
      const user = await User.create({ name, isGuest });
      return res
        .status(201)
        .json({ success: "Guest user created successfully", user });
    }

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    // Check if user exists
    const userExists = await User({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    // Response
    res.status(201).json({ success: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** @description Login a User */
export const login = async (req, res) => {
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
    const token = sign({ _id: user._id }, process.env.JWT_SECRET);

    // Response
    res.status(200).json({ success: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
