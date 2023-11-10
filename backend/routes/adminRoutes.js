import express from "express";

import { registerAdmin,adminAuth,getGuideRequest ,adminLogout,acceptGuide} from "../controllers/adminController.js";

const router = express.Router();

// router.post("/auth", adminAuth);
router.post("/adminRegister", registerAdmin);
router.post("/adminAuth",adminAuth)
router.post("/guideRequests",getGuideRequest)
router.post("/adminLogout",adminLogout)
router.post("/guideAcceptRequests",acceptGuide);

export default router;