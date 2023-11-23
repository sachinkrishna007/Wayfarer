import mongoose from "mongoose";

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
      required: true,
    },
    endDate: {
      type: String,
      required: true,
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
      default: "Pending",
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
