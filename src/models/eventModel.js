import mongoose from "mongoose";

export const categories = [
  "Tech",
  "Workshop",
  "Seminar",
  "Webinar",
  "Training",
  "Networking",
  "Conference",
  "Cultural",
  "Meetup",
  "Hackathon",
  "Concert",
  "Festival",
  "Sports",
  "Exhibition",
  "Charity",
  "Fundraiser",
  "Party",
  "Gathering",
  "Competition",
  "Entertainment",
  "Others",
];

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
    },
    type: {
      type: String,
      required: [true, "Event type is required"],
      enum: ["public", "private"],
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
      enum: categories,
    },
    attendees: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

eventSchema.index({ date: 1, category: 1, name: 1, location: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
