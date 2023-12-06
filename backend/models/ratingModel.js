import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide", 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  userName: {
    type:String,
    required: true,
  },
  userImage: {
    type:String,

  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  comment: {
    type: String,
    default: "", 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Other fields as needed
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
