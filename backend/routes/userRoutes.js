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
  createBooking,
  getBookingData,
  getUserData,
  forgotPassword,
  verifyAndChangePassword,
  changePassword,
} from "../controllers/userController.js";
import {
  getRooms,
  createRoom,
  chatSend,
  getMessages,
} from "../controllers/chatController.js";

import { getSingleBooking } from "../controllers/bookingController.js";
import { AddRating, findRating } from "../controllers/ratingController.js";

router.post("/auth", authUser);
router.post("/register", registerUser);
router.get("/getGuide", getGuide);
router.post("/googleRegister", googleRegister);
router.post("/createBooking", protect, createBooking);
router.get("/getSingleGuide", getSingleGuide);
router.get("/getSingleGuide", getSingleGuide);
router.get("/getUserData", getUserData);
router.get("/getBookingData", getBookingData);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyOtp", verifyAndChangePassword);
router.post("/changePassword", changePassword);
router.get("/getBooking", getSingleBooking);
router.post("/addRating", AddRating);
router.post("/getRatings", findRating);
router.get("/logout", protect, logout);

//chat routes
router.get("/getrooms", getRooms);
router.post("/createRoom", createRoom);
router.post("/sendchat", chatSend);
router.post("/getmessages", getMessages);

export default router;
