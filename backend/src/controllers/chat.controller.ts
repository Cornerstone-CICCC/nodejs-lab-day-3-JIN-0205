import { Request, Response } from "express";
import { Chat } from "../models/chat.model";

// Get all chats
const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 }); // Sort by createdAt field
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chats" });
  }
};

// Get messages by room
const getMessagesByRoom = async (
  req: Request<{ room: string }>,
  res: Response
) => {
  try {
    const { room } = req.params;
    const chats = await Chat.find({ room }).sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: `Error fetching chats from the room` });
  }
};

export default {
  getAllChats,
  getMessagesByRoom,
};
