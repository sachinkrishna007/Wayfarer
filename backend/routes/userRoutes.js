 import express from 'express'
 const router = express.Router();
 import { authUser,registerUser,googleRegister,getGuide,getSingleGuide,logout} from '../controllers/userController.js';

 router.post ('/auth',authUser)
 router.post("/register", registerUser);
 router.get("/getGuide", getGuide);
 router.post("/googleRegister",googleRegister );
 router.get("/getSingleGuide",getSingleGuide );
 router.get("/logout",logout );

    export default router;