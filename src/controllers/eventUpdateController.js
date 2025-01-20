import { Types } from "mongoose";

// Models
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import { Server, Socket } from "socket.io";

/**
 * WebSockets Event Updates
 *
 * @param { Server }  io - Socket.io Server
 * @type { Socket } socket - Socket.io Socket
 *
 * Events Listeners:
 * - join - Join Event ({eventId, userId})
 * - message - Public Chat (string)
 * - updates (host) - Host Updates ({text, title, type})
 * - leave - Leave Event ()
 * - close (host) - Close Event ()
 * - disconnect - Disconnect User ()
 *
 * Events Emitters:
 * - alert - Alert Users (string)
 * - alert-room - Alert Event Participants (string)
 * - message - Public Chat {message, userId}
 * - updates - Host Updates {update:{text, title, type}, userId}
 * - online - Online Users (number)
 * - disconnect - Disconnect User ()
 *
 */
export const eventUpdates = (io) => {
  io.on(
    "connection",
    /**
     * @param {Socket} socket
     */
    (socket) => {
      // Join Event
      socket.on("join", async (payload) => {
        const { eventId, userId } = payload;

        // Validation
        if (
          !Types.ObjectId.isValid(eventId) ||
          !Types.ObjectId.isValid(userId)
        ) {
          return socket.emit("alert", "Invalid Event or User ID");
        }

        // Check if event and user exists

        // Join Event
        socket.join(eventId);

        // Alert User
        socket.emit("alert", `You have joined the event: ${eventId}`);

        // Alert Event Participants
        io.to(eventId).emit("alert-room", `${userId} has joined the event`);

        // Online Users
        const sockets = await io.in(eventId).fetchSockets();
        io.to(eventId).emit("online", sockets.length);

        // Public Chat
        socket.on("message", (message) => {
          io.to(eventId).emit("message", { message, userId });
        });

        // Leave Event
        socket.on("leave", () => {
          socket.leave(eventId);
          io.to(eventId).emit(
            "alert-room",
            `User: ${userId} has left the event`
          );
          socket.disconnect();
        });

        // Host Updates
        socket.on("updates", async (update) => {
          io.to(eventId).emit("updates", { update, userId });
        });
        // Close Event
        socket.on("close", () => {
          io.to(eventId).emit("alert-room", "Event has been closed");
          io.to(eventId).disconnectSockets(true);
        });
      });

      // Disconnect
      socket.on("disconnect", () => {
        console.log("User Disconnected");
      });
    }
  );
};
