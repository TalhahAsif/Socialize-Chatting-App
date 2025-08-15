import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const createConversation = async (req, res) => {
    const userId = req.user._id
    const { memeberId } = req.body
    try {
        const newConversation = new Conversation({
            members: [userId, memeberId],
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

export const findUsers = async (req, res) => {
    const { userNameorEmail } = req.body
    try {
        const user = await User.find({ $or: [{ username: { $regex: userNameorEmail, $options: "i" } }, { email: { $regex: userNameorEmail, $options: "i" } }] });

        if (user.length === 0) {
            return res.status(404).json({
                message: "No User found with this username or email",
            })
        }

        console.log(user, "searched User");

    } catch (error) {

    }
}