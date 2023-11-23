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
  changePassword
} from "../controllers/guideController.js";
import { protect } from "../middleware/guideAuthMiddlware.js";

router.post("/authGuide", authGuide);
router.post("/registerGuide", registerGuide);
router.get("/guideLogout",protect, guideLogout);
router.post("/guideAddLanguage", guideAddLanguage);
router.post("/guideAddPrice", protect, guideAddPrice);
router.post("/guideAddDesc", protect, guideAddDescription);
router.post("/getGuideData", protect, getGuideData);
router.post("/Changepassword", protect, changePassword);
export default router;
