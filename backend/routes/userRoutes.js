import express from "express";
const router = express.Router();
import { protect } from "../middleware/userAuthMiddleware.js";
import {
  authUser,
  registerUser,
  googleRegister,
  getGuide,
  getSingleGuide,
  logout,
  getBookingData,
  getUserData,
  forgotPassword,
  verifyAndChangePassword,
  changePassword,
  checkAvailablity,
  GetGuidesOnDates,
  getBookingDatesGuide,
  updateUserProfile,
  getProfile,
  getFollowing,
  userGetNotifications
} from "../controllers/userController.js";
import {
  getRooms,
  createRoom,
  chatSend,
  getMessages,
} from "../controllers/chatController.js";

import { getSingleBooking ,createBooking, UserCancelBooking} from "../controllers/bookingController.js";
import { AddRating, findRating, followGuide } from "../controllers/ratingController.js";
import { getBlogs } from "../controllers/blogController.js";

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/getGuide", getGuide);
router.post("/googleRegister", googleRegister);
router.post("/createBooking", protect, createBooking);
router.get("/getSingleGuide",protect,getSingleGuide);

router.get("/getUserData", getUserData);
router.get("/getBookingData",protect, getBookingData);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyOtp", verifyAndChangePassword);
router.post("/changePassword", changePassword);
router.get("/getBooking",protect, getSingleBooking);
router.post("/addRating",protect, AddRating);
router.post("/getRatings",protect, findRating);
router.post("/checkAvailablity",protect, checkAvailablity);
router.post("/filterGuides",protect, GetGuidesOnDates);
router.post("/getGuidesBookingDates",getBookingDatesGuide);
router.post('/follow',protect,followGuide)
router.post('/updateProfile',protect,updateUserProfile)
router.get('/getProfile',protect,getProfile)
router.get("/getBlog", protect, getBlogs);
router.get("/getFollowing", protect, getFollowing);
router.get("/CancelBooking", protect, UserCancelBooking);
router.get("/UserGetNotification", protect, userGetNotifications);
router.get("/logout", logout);

//chat routes
router.get("/getrooms", getRooms);
router.post("/createRoom", createRoom);
router.post("/sendchat", chatSend);
router.post("/getmessages", getMessages);

export default router;
