import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Guide from "../models/guideModel.js";

import { ObjectId } from "mongodb";

import Booking from "../models/bookingModel.js";



const getSingleBooking = asyncHandler(async (req, res) => {
  const { id } = req.query;

  try {
    const objectId = new ObjectId(id);
    const bookingData = await Booking.findOne({ _id: objectId });

    if (bookingData) {
      res.status(200).json({ bookingData });
    } else {
      res.status(404).json({ message: "Data not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

export {
    getSingleBooking
}
