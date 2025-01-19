import jwt from "jsonwebtoken";

// Model
import User from "../models/userModel.js";

/** @description Authentication Middleware */
const authenticate = async (req, res, next) => {
  try {
    // Get Token from Header
    const token = req.header("Authorization")?.replace("Bearer ", "") || "";
    if (!token) {
      throw {
        statusCode: 401,
        message: "Unauthorized. Access token is required.",
      };
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      // Find User
      const user = await User.findById(decoded._id);
      if (!user) {
        throw {
          statusCode: 401,
          message: "Unauthorized. User not found.",
        };
      }

      // Set User
      req.userId = user._id;

      // Next
      next();
    } else {
      throw { statusCode: 401, message: "Unauthorized. Invalid token." };
    }
  } catch (error) {
    next(error);
  }
};

export default authenticate;
