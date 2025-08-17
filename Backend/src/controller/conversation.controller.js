import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const createConversation = async (req, res) => {
    const userId = req.user._id
    const { memberId } = req.body

    try {
        const newConversation = new Conversation({
            members: [userId, memberId],
        })
        await newConversation.save();

        res.status(200).json({
            newConversation,
            message: "Conversation created",
        });
    } catch (error) {
        console.log("error in createConversation", error.message);
        res.status(500).json({
            messege: "Internal Server Error",
        });
    }
}

export const getConversation = async (req, res) => {
    const userId = req.user._id
    try {
        const conversations = await Conversation.find({ members: { $all: [userId] } });

    } catch (error) {
        console.log("error in getConversation", error.message);
        res.status(500).json({
            messege: "Internal Server Error",
        });
    }
}

export const findUsers = async (req, res) => {
    const { userNameorEmail } = req.query

    try {
        const user = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: `^${userNameorEmail}$`, $options: "i" } },
                        { email: { $regex: `^${userNameorEmail}$`, $options: "i" } }
                    ]
                },
                { _id: { $ne: req.user._id } }
            ]
        });

        if (user.length === 0) {
            return res.status(404).json({
                message: "No User found with this username or email",
            })
        }

        res.status(201).json({
            message: "User found except me",
            user
        })

    } catch (error) {
        console.log("error in findUsers", error.message);
        res.status(500).json({
            messege: "Internal Server Error",
        });
    }
}