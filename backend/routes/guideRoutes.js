import express from "express";
const router = express.Router();
import { multerUploadId } from "../config/multer.js";

import { registerGuide,authGuide,guideLogout,guideAddLanguage,guideAddPrice } from "../controllers/guideController.js";


router.post("/authGuide", authGuide);
router.post("/registerGuide", multerUploadId.single('idimage'), registerGuide);
router.get('/guideLogout',guideLogout)
router.post('/guideAddLanguage',guideAddLanguage)
router.post('/guideAddPrice',guideAddPrice)
 export default router;