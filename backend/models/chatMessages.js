import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chatRoom",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "senderType", // Use dynamic reference based on senderType
  },
  senderType: {
    type: String,
    enum: ["User", "Guide"],
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

export default ChatMessage;
