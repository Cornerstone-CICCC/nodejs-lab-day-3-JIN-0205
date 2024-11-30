"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_model_1 = require("../models/chat.model");
const setupChatSocket = (io) => {
    io.on("connection", (socket) => {
        // On connect
        console.log(`User connected: ${socket.id}`);
        // Listen to 'sendMessage' event
        socket.on("sendMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, message, room } = data;
            try {
                // Save message to MongoDB
                const chat = new chat_model_1.Chat({ username, message, room });
                yield chat.save();
                // Broadcast the chat object to all clients in the room via the newMessage event
                io.to(room).emit("newMessage", chat);
            }
            catch (error) {
                console.error("Error saving chat:", error);
            }
        }));
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
exports.default = setupChatSocket;
