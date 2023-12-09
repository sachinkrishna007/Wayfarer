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
  guideAddCategory
} from "../controllers/guideController.js";

import {
  chatSend,
  getMessages,
  getGuideRooms,
} from "../controllers/chatController.js";
import { protect } from "../middleware/guideAuthMiddlware.js";

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
router.post("/Activate", protect, GuideActivateAccount);

router.post("/guidesendchat", chatSend);
router.post("/guidegetmessages", getMessages);
router.post("/getguiderooms", getGuideRooms);
router.get('/getCategory',protect,getCategory)
router.post('/AddCategory',protect,guideAddCategory)

export default router;
