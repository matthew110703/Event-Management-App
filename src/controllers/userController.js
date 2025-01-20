// Models
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";

/** @description Get a single User */
export const getUser = async (req, res, next) => {
  const userId = req.userId;

  try {
    // Get User
    const user = await User.findById(userId).select("-password");

    // Response
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/** @description Join Event */
export const joinEvent = async (req, res, next) => {
  const userId = req.userId;
  const { eventId } = req.body;

  // Validation
  if (!eventId) {
    throw {
      statusCode: 400,
      message: "Event ID is required.",
    };
  }

  try {
    // Get User
    const user = await User.findById(userId);
    if (!user) {
      throw {
        statusCode: 404,
        message: "User not found.",
      };
    }

    // Get Event
    const event = await Event.findById(eventId);
    if (!event) {
      throw {
        statusCode: 404,
        message: "Event not found.",
      };
    }

    // Check if User is already in the Event
    if (event.attendees.includes(userId)) {
      throw {
        statusCode: 400,
        message: "User is already in the event.",
      };
    }

    // Join Event
    event.attendees.push(userId);
    await event.save();

    // Success Response
    res.status(200).json({
      success: "You have joined the event.",
    });
  } catch (error) {
    next(error);
  }
};
