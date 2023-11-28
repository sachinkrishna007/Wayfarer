import User from "../models/userModel.js";
import Guide from "../models/guideModel.js";
import Rating from "../models/ratingModel.js";
import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";

const AddRating = asyncHandler(async (req, res) => {
  console.log("Received request body:", req.body);
  const { value, comment, userId, guideId } = req.body;

  const existingRating = await Rating.findOne({
    userId: userId,
    guideId: guideId,
  });

  if (existingRating) {
    throw new Error("User already exists");
  } else {
    const newRating = new Rating({
      userId: userId,
      guideId: guideId,
      rating: value,
      comment: comment,
    });

    await newRating.save();
    console.log("Rating saved:", newRating);

    res.status(201).json();
  }
});

const findRating = asyncHandler(async (req, res) => {
  const guideId = req.body;
  console.log(guideId);
  const objectId = new ObjectId(guideId);

  const comments = await Rating.find({ guideId });
  if (comments) {
    console.log("comment");
    res.status(200).json({ comments });
  } else {
    res.status(404);

    throw new Error("Users data fetch failed.");
  }
});

export { AddRating, findRating };
