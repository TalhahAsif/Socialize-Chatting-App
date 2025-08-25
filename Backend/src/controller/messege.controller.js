import mongoose from "mongoose";
import cloudinary from "../lib/cloudnary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { ObjectId } from "mongodb";

export const getMessages = async (req, res) => {
  const conversationId = req.params.conversationId;

  try {
    const chat = await Message.find({
      conversation_id: conversationId
    }).populate("conversation_id", "members")

    if (chat.length === 0) {
      return res.status(200).json({
        message: "No Chats",
      });
    }
    res.status(200).json({
      chat,
      message: "Chat Found",
    });
  } catch (error) {
    console.log("Error in getMessage ==>", error.message);
    res.status(500).json({
      messege: "Internal Server Error",
    });
  }
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const sendChat = async (req, res) => {
  const { text } = req.body;
  const { conversationId } = req.params;
  const images = req.images;
  const documents = req.documents;

  try {
    const newMessage = new Message({
      text,
      images,
      documents,
      conversation_id: conversationId,
    });

    res.status(200).json({
      newMessage,
      message: "Message send",
    });
    await newMessage.save();
  } catch (error) {
    console.log("Error in sendChat", error.message);
    res.status(200).json({
      message: "Internal Server Error",
    });
  }
};
