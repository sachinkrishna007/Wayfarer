import mongoose from "mongoose";
import User from "./userModel.js";
import Guide from "./guideModel.js";
const notificationSchema = new mongoose.Schema({
  sender: {
    type: String,
  },
  reciever: {
    type: String,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "recieverModel",
  },
  recieverModel: {
    type: String,
    enum: ["User", "Guide"], 
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 2,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
