import mongoose from "mongoose";
import cloudinary from "../lib/cloudnary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { ObjectId } from "mongodb";

export const userForSideBar = async (req, res) => {
  try {
    const currentUserID = req.user._id;

    const Users = await User.find({ _id: { $ne: currentUserID } }).select(
      "-password"
    );

    console.log(Users);

    if (Users.length == 0) {
      res.status(404).json({
        message: "User not Found",
      });
    } else {
      res.status(200).json({
        user: Users,
        message: "User found",
      });
    }
  } catch (error) {
    console.log("error in userForSideBar", error.message);
    res.status(200).json({
      message: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const myID = req.user._id;
    const usertoChat = req.params;

    console.log("this is myID", myID);
    console.log("this is receiver ID", new ObjectId(usertoChat.params));

    const chat = await Message.find({
      $or: [
        { sender_id: myID, receiver_id: new ObjectId(usertoChat.params) },
        { sender_id: new ObjectId(usertoChat.params), receiver_id: myID },
      ],
    });

    if (!chat) {
      return res.status(404).json({
        message: "No Chats",
      });
    }

    res.status(200).json({
      chat,
      message: "Chat Found",
    });
  } catch (error) {
    console.log("Error in getMessage", error.message);
    res.status(500).json({
      messege: "Internal Server Error",
    });
  }
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const sendChat = async (req, res) => {
  const { text, image } = req.body;
  const { id: receiver_id } = req.params;
  const sender_id = req.user._id;

  if (!isValidObjectId(receiver_id) || !isValidObjectId(sender_id)) {
    res.status(500).json({
      messege: "Not a valid Object ID",
    });
  }

  try {
    let chat = { receiver_id, sender_id };

    if (text) {
      chat.text = text;
    }
    if (image) {
      const uploadImg = await cloudinary.uploader.upload(image);
      chat.image = uploadImg.secure_url;
    }

    const newMessage = new Message(chat);

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
