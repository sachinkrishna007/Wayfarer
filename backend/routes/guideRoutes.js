import express from "express";
const router = express.Router();

import { multerUploadId } from "../config/multer.js";

import { registerGuide,authGuide,guideLogout,guideAddLanguage,guideAddPrice,getGuideData } from "../controllers/guideController.js";
import { protect } from "../middleware/guideAuthMiddlware.js";

router.post("/authGuide", authGuide);
router.post("/registerGuide", multerUploadId.single('idimage'), registerGuide);
router.get('/guideLogout',guideLogout)
router.post('/guideAddLanguage',guideAddLanguage)
router.post('/guideAddPrice',protect,guideAddPrice)
router.post('/getGuideData',protect,getGuideData)
 export default router;