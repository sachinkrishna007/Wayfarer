import User from "../models/userModel.js";
import Guide from "../models/guideModel.js";
import Rating from "../models/ratingModel.js";
import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";
import Booking from "../models/bookingModel.js";
import Notification from "../models/notifications.js";
import mongoose from "mongoose";

const AddRating = asyncHandler(async (req, res) => {

  const { value, comment, userId, guideId, userName, userimage } = req.body;

  const existingRating = await Rating.findOne({
    userId: userId,
    guideId: guideId,
  });

  if (existingRating) {
    throw new Error("you can only rate once");
  } else {
    const newRating = new Rating({
      userId: userId,
      guideId: guideId,
      rating: value,
      comment: comment,
      userName: userName,
      userImage: userimage,
    });

    await newRating.save();

    console.log("Rating saved:", newRating);

    res.status(200).json({ newRating });
  }
});

// const findRating = asyncHandler(async (req, res) => {
//   const guideId = req.body;
//   console.log(guideId);
//   const objectId = new ObjectId(guideId);

//   const comments = await Rating.find({});
//   if (comments) {
//     console.log(comments);
//     res.status(200).json({ comments });
//   } else {
//     res.status(404);

//     throw new Error("Users data fetch failed.");
//   }
// });

const findRating = asyncHandler(async (req, res) => {
  const guideId = req.body.guideId;

  const objectId = new ObjectId(guideId);

  const comment = await Rating.find({ guideId: objectId }).populate('userId').exec();
  console.log(comment);
  const booking = await Booking.find({ guideid: objectId });
  if (comment) {
    res.status(200).json({ comment, booking });
  } else {
    res.status(404);

    throw new Error("Users data fetch failed.");
  }
});


const followGuide = asyncHandler(async (req, res) => {
  const { guideId, userId } = req.body;

  const userObjectId = new mongoose.Types.ObjectId(userId);
  const guideObjectId = new mongoose.Types.ObjectId(guideId);


  const guide = await Guide.findOne({ _id: guideId });
  const user = await User.findOne({ _id: userObjectId });

  if (!guide) {
    res.status(404);
    throw new Error("Guide not found");
  }

  const isFollowing = guide.followers.includes(userObjectId);

  if (isFollowing) {
    // If already following, unfollow
    const followerIndex = guide.followers.indexOf(userObjectId);
    guide.followers.splice(followerIndex, 1);
    await guide.save();
    res.status(200).json({ guide });
  } else {
    // If not following, follow
    guide.followers.push(userObjectId);
    await guide.save();
     await createNotification({
       senderId: userObjectId,
       recieverId: guideObjectId,
       message: ` ${user.firstName} started following you.`,
     });

    res.status(200).json({guide });   
  }
});

const createNotification = async ({ senderId, recieverId, message }) => {
  const notification = new Notification({
    sender: "user", 
    receiver: "guide",
    senderId,
    recieverId,
    type:"following",
    message,
  });

  await notification.save();
};

export { AddRating, findRating ,followGuide};
