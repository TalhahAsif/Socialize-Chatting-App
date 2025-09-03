import mongoose from "mongoose";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { ObjectId } from "mongodb";
import { uploadToCloudinary } from "../lib/cloudnary.js";
import { getIO } from "../lib/connect-socket.js";

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
  const images = req.files?.images;
  const documents = req.files?.documents;
  const userId = req.user._id;

  try {
    const uploadedImages = [];
    const uploadedDocuments = [];

    if (images && images.length > 0) {
      for (let img of images) {
        const result = await uploadToCloudinary(img);
        uploadedImages.push(result);
      }
    }

    if (documents && documents.length > 0) {
      for (let doc of documents) {
        const result = await uploadToCloudinary(doc.buffer);
        uploadedDocuments.push(result);
      }
    }

    const newMessage = new Message({
      text,
      images: uploadedImages,
      documents: uploadedDocuments,
      conversation_id: conversationId,
      createdBy: userId,
    });

    await newMessage.save();

    const io = getIO();
    io.to(conversationId).emit("receiveMessage", newMessage);

    res.status(200).json({
      newMessage,
      message: "Message sent",
    });
  } catch (error) {
    console.error("Error in sendChat:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
