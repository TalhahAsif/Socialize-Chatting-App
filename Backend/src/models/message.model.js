import mongoose from "mongoose";

const messegeSchema = new mongoose.Schema(
  {
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    text: {
      type: String,
    },
    images: [{
      url: { type: String },
      filename: { type: String },
      public_id: { type: String }
    }],
    documents: [{
      url: { type: String },
      filename: { type: String },
      public_id: { type: String } 
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("messege", messegeSchema);

export default Message;
