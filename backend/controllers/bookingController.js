import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Guide from "../models/guideModel.js";
import Notification from "../models/notifications.js";
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
    payementType,
  } = req.body;
  console.log(req.body, "jg");

  if (payementType === "Wallet") {
    const user = await User.findOne({ email: userEmail });

    const paymentAmount = totalAmount;
    if (user.wallet < paymentAmount) {
      res.status(400);
      throw new Error("Insufficient Wallet Balance");
    } else if (user.wallet >= paymentAmount) {
      user.wallet -= paymentAmount;
      user.walletTransaction.push({
        type: "debit",
        amount: paymentAmount,
        date: new Date(),
      });
      await user.save();
    }
  }

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
    status: "Accepted",
    payementType,
  });
  const guideNotification = new Notification({
    sender: userName,
    reciever: guideName,
    senderId: userid,
    recieverId: guideid,
    type:'NewBooking',
    message: `🎉 New booking from ${userName}!`,
  });

  // Save the guide notification
  await guideNotification.save();
  res.status(201).json({ success: true, data: newBooking });
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

const UserCancelBooking = asyncHandler(async (req, res) => {
  const { BookingId, userId } = req.query;
  const objectId = new ObjectId(BookingId);
  const userIdToFind = new ObjectId(userId);

  const booking = await Booking.findOne({ _id: objectId });
  const user = await User.findOne({ _id: userIdToFind });

  if (!booking) {
    res.status(400);
    throw new Error("Bookig not found");
  }
  if (booking.startDate && new Date() > new Date(booking.endDate)) {
    res.status(400);
    throw new Error("Booking end date has passed, cancellation not allowed.");
  }

  const cancellationMessage = `Booking  on ${booking.startDate} for ${booking.location}  has been cancelled by ${booking.userName}`;
  const cancellationNotification = new Notification({
    sender: "System", // or any other identifier for the system
    reciever: user.email, // or any other identifier for the user
    senderId: null, // or any other identifier for the system
    recieverId: booking.guideid,
    message: cancellationMessage,
    type: "cancel",
  });

  // Save the notification
  await cancellationNotification.save();
  booking.status = "cancelled";

  booking.startDate = null;
  booking.endDate = null;
  const currentWalletBalance = user.wallet || 0;
  user.wallet = currentWalletBalance + booking.totalAmount / 2;
  user.walletTransaction.push({
    type: "credit",
    amount: booking.totalAmount / 2,
    date: new Date(),
  });
  await user.save();

  await booking.save();
  res.status(200).json({ booking });
});

const GuideCancelBooking = asyncHandler(async (req, res) => {
  const { BookingId, userId } = req.query;
  const objectId = new ObjectId(BookingId);
  const userIdToFind = new ObjectId(userId);

  const booking = await Booking.findOne({ _id: objectId });
  const user = await User.findOne({ _id: userIdToFind });

  if (!booking) {
    res.status(400);
    throw new Error("Bookig not found");
  }
  if (booking.startDate && new Date() > new Date(booking.endDate)) {
    res.status(400);
    throw new Error("Booking end date has passed, cancellation not allowed.");
  }
  const cancellationMessage = `Booking  on ${booking.startDate} for ${booking.location}  has been cancelled by ${booking.guidename}`;
  const cancellationNotification = new Notification({
    sender: "System",
    reciever: user.email,
    senderId: null,
    recieverId: booking.userid,
    message: cancellationMessage,
    type: "cancel",
  });

  // Save the notification
  await cancellationNotification.save();
  booking.status = "Guidecancelled";

  booking.startDate = null;
  booking.endDate = null;
  const currentWalletBalance = user.wallet || 0;
  user.wallet = currentWalletBalance + booking.totalAmount;
  user.walletTransaction.push({
    type: "credit",
    amount: booking.totalAmount,
    date: new Date(),
  });
  await user.save();

  await booking.save();
  res.status(200).json({ booking });
});

export {
  getSingleBooking,
  createBooking,
  UserCancelBooking,
  GuideCancelBooking,
};
