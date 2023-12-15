import express from "express";
const router = express.Router();

import {
  registerGuide,
  authGuide,
  guideLogout,
  guideAddLanguage,
  guideAddPrice,
  getGuideData,
  guideAddDescription,
  changePassword,
  getBookingData,
  deleteLanguage,
  GuideActivateAccount,
  getCategory,
  guideAddCategory,
  deleteActivity,
  getProfile,
  getNotifications
} from "../controllers/guideController.js";

import {
  chatSend,
  getMessages,
  getGuideRooms,
} from "../controllers/chatController.js";
import { protect } from "../middleware/guideAuthMiddlware.js";
import { GuidedeleteBlog, GuidegetBlogs, createBlog } from "../controllers/blogController.js";
import { GuideCancelBooking, getSingleBooking } from "../controllers/bookingController.js";

router.post("/authGuide", authGuide);
router.post("/registerGuide", registerGuide);
router.get("/guideLogout", protect, guideLogout);
router.get("/getGuideBookings", protect, getBookingData);
router.post("/guideAddLanguage", guideAddLanguage)
router.post("/guideAddPrice", protect, guideAddPrice)
router.post("/guideAddDesc", protect, guideAddDescription)
router.post("/getGuideData", protect, getGuideData);
router.post("/Changepassword", protect, changePassword);
router.post("/deleteLanguage", protect, deleteLanguage);
router.get("/deleteActivity", protect, deleteActivity);
router.post("/Activate", protect, GuideActivateAccount);

router.post("/guidesendchat", chatSend);
router.post("/guidegetmessages", getMessages);
router.post("/getguiderooms", getGuideRooms);
router.get('/getCategory',protect,getCategory)
router.post('/AddCategory',protect,guideAddCategory)
router.post('/createBlog',protect,createBlog)
router.get('/guideGetBlogs',protect,GuidegetBlogs)
router.get('/guideViewBookings',protect,getSingleBooking)
router.get("/guideCancelBooking", protect, GuideCancelBooking);
router.get('/getUserProfile',protect,getProfile)
router.get('/guideNotifications',protect,getNotifications)
router.delete('/deleteBlog',protect,GuidedeleteBlog)

export default router;
