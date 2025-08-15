import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    isGroup: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Conversation = mongoose.model("conversation", conversationSchema)

export default Conversation