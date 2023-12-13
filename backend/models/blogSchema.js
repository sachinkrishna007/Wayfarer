import mongoose from "mongoose";
import Guide from "./guideModel.js";
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    tags: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    travelImages: [
      {
        type: String,
      },
    ],
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Vlog", blogSchema);

export default Blog;
