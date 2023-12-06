import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Guide from "../models/guideModel.js";

import { ObjectId } from "mongodb";

import Booking from "../models/bookingModel.js";


const createBooking = asyncHandler(async (req, res) => {
  const {
    userid,
    userName,
    guideid,
    Location,
    startDate,
    endDate,
    Days,
    totalAmount,
    userEmail,
    guideName,
    guideImage,
  } = req.body;
  console.log(req.body, "jg");
  try {
    const newBooking = await Booking.create({
      userEmail: userEmail,
      userid: userid,
      userName: userName,
      guidename: guideName,
      guideid: guideid,
      location: Location,
      startDate: startDate,
      endDate: endDate,
      totalDays: Days,
      totalAmount: totalAmount,
      guideImage: guideImage,
      status: "Pending",
    });

    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});




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
    getSingleBooking,createBooking
}
