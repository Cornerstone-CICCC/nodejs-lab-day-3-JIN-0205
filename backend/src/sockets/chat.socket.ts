import { Server, Socket } from "socket.io";
import { Chat } from "../models/chat.model";

const setupChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    // On connect
    console.log(`User connected: ${socket.id}`);

    // Listen to 'sendMessage' event
    socket.on("sendMessage", async (data) => {
      const { username, message, room } = data;

      try {
        // Save message to MongoDB
        const chat = new Chat({ username, message, room });
        await chat.save();

        // Broadcast the chat object to all clients in the room via the newMessage event
        io.to(room).emit("newMessage", chat);
      } catch (error) {
        console.error("Error saving chat:", error);
      }
    });

    // On disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    // Joining a room
    socket.on("join room", (data) => {
      const { username, room } = data;
      socket.join(room);
      console.log(`${username} joined the room ${room}`);

      io.to(room).emit("newMessage", {
        message: `${username} joined the room`,
        username: "System",
        room,
      });
    });

    // Leaving a room
    socket.on("leave room", (data) => {
      const { username, room } = data;
      socket.leave(room);
      console.log(`${username} has left the room ${room}`);

      io.to(room).emit("newMessage", {
        message: `${username} has left the room`,
        username: "System",
        room,
      });
    });
  });
};

export default setupChatSocket;
