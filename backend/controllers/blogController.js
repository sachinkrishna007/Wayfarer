import asyncHandler from "express-async-handler";
import Guide from "../models/guideModel.js";
import Category from "../models/categoryModels.js";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blogSchema.js";

const createBlog = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, description, tags, videoUrl, image, guide, travelImages } =
    req.body;
  const result = await cloudinary.uploader.upload(image, {
    folder: "blogs",
  });

  const newBlog = new Blog({
    title,
    description,
    tags,
    videoUrl,
    imageUrl: result.secure_url,
    guide: guide,
    travelImages,
  });

  const savedBlog = await newBlog.save();
  res.status(201).json(savedBlog);
});

const getBlogs = asyncHandler(async (req, res) => {
  console.log("kk");
  const blog = await Blog.find({}).populate("guide").exec();

  if (blog) {
    res.status(200).json({ blog });
  } else {
    res.status(400);
    throw new Error("fetch failed");
  }
});  
const GuidegetBlogs = asyncHandler(async (req, res) => {
  console.log("sdfsdfsf");
  const { guide } = req.query;
  const blog = await Blog.find({ guide }).populate("guide").exec();

  console.log(blog);
  if (blog) {
    res.status(200).json({ blog });
  } else {
    res.status(400);
    throw new Error("fetch failed");
  }
});

const GuidedeleteBlog = asyncHandler(async (req, res) => {
  console.log(req.query);
  const { blogId } = req.query;

  if (!blogId) {
    res.status(400);
    throw new Error("Blog ID is required");
  }

  const blog = await Blog.findById(blogId);
  console.log(blog);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  // Delete the blog
  await blog.deleteOne({ blog });

  res.status(200).json({ message: "Blog deleted successfully" });
});

export { createBlog, getBlogs, GuidegetBlogs, GuidedeleteBlog };
