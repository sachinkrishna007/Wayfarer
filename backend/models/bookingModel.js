import mongoose from "mongoose";
import User from "./userModel.js";

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
      ref: User,
    },
    userName: {
      type: String,
      required: true,
    },
    guidename: {
      type: String,
      required: true,
    },
    guideid: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
    
    },
    endDate: {
      type: String,
    
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Accepted",
    },
    guideImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking= mongoose.model("Booking", bookingSchema);
export default Booking
