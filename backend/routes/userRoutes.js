 import express from 'express'
 const router = express.Router();
 import { authUser,registerUser,googleRegister,getGuide,logout} from '../controllers/userController.js';


 router.post ('/auth',authUser)
 router.post("/register", registerUser);
 router.get("/getGuide", getGuide);
 router.post("/googleRegister",googleRegister );
 router.post("/logout",logout );

    export default router;