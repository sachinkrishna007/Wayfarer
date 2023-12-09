import express from "express";
import { protect } from "../middleware/adminAuthMiddleware.js";
import {
  registerAdmin,
  adminAuth,
  getGuideRequest,
  adminLogout,
  acceptGuide,
  BlockUser,
  UnBlockUser,
  listGuide,
  BlockGuide,
  UnBlockGuide,
  getAdminBookingData,
  loadDashboard,
  createCategory
} from "../controllers/adminController.js";

const router = express.Router();

// router.post("/auth", adminAuth);
router.post("/adminRegister", registerAdmin);
router.post("/adminAuth", adminAuth);
router.post("/guideRequests", protect, getGuideRequest);
router.post("/adminLogout",protect, adminLogout);
router.post("/guideAcceptRequests", protect,acceptGuide);
router.post("/block-user",protect, BlockUser);
router.post("/unblock-user",protect, UnBlockUser);
router.post("/block-guide",protect, BlockGuide);
router.post("/unblock-guide",protect,UnBlockGuide);
router.post('/listGuide',listGuide)
router.get('/adminBookingData',getAdminBookingData)
router.get('/adminDashboard',loadDashboard)
router.post('/category',createCategory)
export default router;
