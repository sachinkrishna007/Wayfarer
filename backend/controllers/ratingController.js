import User from "../models/userModel.js";
import Guide from "../models/guideModel.js";
import Rating from "../models/ratingModel.js";
import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";
import Booking from "../models/bookingModel.js";

const AddRating = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { value, comment, userId, guideId,userName,userimage } = req.body;

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
      userName:userName,
      userImage:userimage,
    });

    await newRating.save();

    console.log("Rating saved:", newRating);

    res.status(200).json({newRating});
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

const findRating = asyncHandler(async(req,res)=>{
 
   const guideId = req.body.guideId;
 
   const objectId = new ObjectId(guideId);

  
    const comment = await Rating.find({guideId:objectId});
   const booking = await Booking.find({ guideid:objectId });
    if(comment){
      res.status(200).json({comment,booking})
    }else {
    res.status(404);

    throw new Error("Users data fetch failed.");
  }
})







export { AddRating, findRating };
