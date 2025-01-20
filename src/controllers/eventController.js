import { Types } from "mongoose";

// Model
import Event from "../models/eventModel.js";

/** @description Get All Events */
export const getEvents = async (req, res, next) => {
  const { name, category, date, type, from, to } = req.query;

  try {
    // Filter Query
    let query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };
    if (date) query.date = date;
    if (from && to) {
      const start = new Date(from);
      const end = new Date(to);
      query.$and = [{ date: { $gte: start } }, { date: { $lte: end } }];
    }
    if (type) query.type = type;

    // Get Events
    const events = await Event.find(query).populate("host", "name email");

    // Response
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

/** @description Create a new Event */
export const createEvent = async (req, res, next) => {
  const userId = req.userId;
  const { name, description, date, location, type, category } = req.body;

  try {
    // Validation
    if (!name || !description || !date || !location || !type || !category) {
      throw {
        statusCode: 400,
        message:
          "All fields are required. [name, description, date, location, type, category]",
      };
    }

    // Create Event
    const event = await Event.create({
      name,
      description,
      date: new Date(date),
      location,
      type,
      category,
      host: userId,
    });

    // Response
    res.status(201).json({ success: "Event Created Successfully.", event });
  } catch (error) {
    next(error);
  }
};

/** @description Get a single event */
export const getEvent = async (req, res, next) => {
  const { id: eventId } = req.params;

  try {
    // Event ID Validation
    if (Types.ObjectId.isValid(eventId) === false) {
      throw {
        statusCode: 400,
        message: "Invalid Event ID.",
      };
    }
    // Get Event
    const event = await Event.findById(eventId).populate("host", "name email");
    if (!event) {
      throw {
        statusCode: 404,
        message: "Event not found.",
      };
    }

    // Response
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

/** @description Update an event */
export const updateEvent = async (req, res, next) => {
  const { id: eventId } = req.params;
  const { name, description, date, location, type, category } = req.body;

  try {
    // Event ID Validation
    if (Types.ObjectId.isValid(eventId) === false) {
      throw {
        statusCode: 400,
        message: "Invalid Event ID.",
      };
    }
    // Get event
    const event = await Event.findById(eventId);
    if (!event) {
      throw {
        statusCode: 404,
        message: "Event not found.",
      };
    }

    // update event
    await event.updateOne({
      name: name || event.name,
      description: description || event.description,
      date: new Date(date) || event.date,
      location: location || event.location,
      type: type || event.type,
      category: category || event.category,
    });

    // Response
    res.status(200).json({ success: "Event updated successfully." });
  } catch (error) {
    next(error);
  }
};

/** @description Delete an event */
export const deleteEvent = async (req, res, next) => {
  const { id: eventId } = req.params;

  try {
    // Event ID Validation
    if (Types.ObjectId.isValid(eventId) === false) {
      throw {
        statusCode: 400,
        message: "Invalid Event ID.",
      };
    }
    // Get event
    const event = await Event.findById(eventId);
    if (!event) {
      throw {
        statusCode: 404,
        message: "Event not found.",
      };
    }

    // Delete event
    await event.deleteOne();

    // Response
    res.status(200).json({ success: "Event deleted successfully." });
  } catch (error) {
    next(error);
  }
};

/** @description Get all Upcoming Events */
export const getUpcomingEvents = async (req, res, next) => {
  const { category, type, name } = req.query;

  try {
    // Filter Query
    let query = {};
    if (category) query.category = { $regex: category, $options: "i" };
    if (name) query.name = { $regex: name, $options: "i" };
    if (type) query.type = type;

    // Get Events
    const events = await Event.find(query)
      .where("date")
      .gte(new Date())
      .sort({ date: 1 })
      .populate("host", "name email");

    // Response
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

/** @description Get all Events by a User */
export const getUserEvents = async (req, res, next) => {
  const userId = req.userId;

  try {
    // Get Events
    const events = await Event.find({ host: userId }).populate(
      "host",
      "name email"
    );

    // Response
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

/** @description Get all Past Events */
export const getPastEvents = async (req, res, next) => {
  const { category, type } = req.query;

  try {
    // Filter Query
    let query = {};
    if (category) query.category = { $regex: category, $options: "i" };
    if (type) query.type = type;

    // Get Events
    const events = await Event.find(query)
      .where("date")
      .lt(new Date())
      .sort({ date: -1 })
      .populate("host", "name email");

    // Response
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

/** @description Get Events that user has Joined */
export const getJoinedEvents = async (req, res, next) => {
  const userId = req.userId;

  try {
    // Get Events
    const events = await Event.find({ attendees: userId }).populate(
      "host",
      "name email"
    );

    // Response
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};
