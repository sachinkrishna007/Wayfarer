import mongoose from "mongoose";

const chatRoom = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // Reference to the User model
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
  }, // Reference to the Guide model
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatMessage" }],
});

const ChatRoom = mongoose.model("chatRoom", chatRoom);

export default ChatRoom;
