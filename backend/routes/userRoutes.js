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
  changeStatus,
  getUserData,
  
} from "../controllers/userController.js";

router.post("/auth", authUser);
router.post("/register", registerUser);
router.get("/getGuide", getGuide);
router.post("/googleRegister", googleRegister);
router.post("/createBooking",protect, createBooking);
router.get("/getSingleGuide", getSingleGuide);
router.post("/changeStatus", changeStatus);
router.get("/getUserData", getUserData);

router.get("/logout",protect, logout);

export default router;
