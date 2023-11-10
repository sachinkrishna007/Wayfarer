import Admin from "../models/adminModel.js";
import Guide from "../models/guideModel.js";
import asyncHandler from "express-async-handler";
import AdmingenarateToken from "../utils/adminGenerateToken.js";


const adminAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    AdmingenarateToken(res, admin._id);

    res.status(201).json({
      _id: admin._id,

      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
    
  const { email, password } = req.body;
console.log('here');
  const AdminExists = await Admin.findOne({ email });

  if (AdminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    email,
    password,
  });

  if (admin) {
    AdmingenarateToken(res, admin._id);

    res.status(201).json({
      _id: admin._id,

      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getGuideRequest = asyncHandler(async (req, res) => {
  const guideData = await Guide.find({isAuthorized:false});
  if (guideData) {
    res.status(200).json({ guideData });
  } else {
    res.status(404).json({ message: "No unauthorized guides found." });

    throw new Error("Users data fetch failed.");
  }
});

 const acceptGuide = asyncHandler(async(req,res)=>{
  const guideId = req.body.userId;
   const acceptGuide = await Guide.findByIdAndUpdate(guideId, { isAuthorized: true });
   if (acceptGuide) {
     res.status(200).json({ success: true });
   } else {
     res.status(404);

     throw new Error(" failed to acccept ");
   }

 })
const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "loggout successful" });
});


export {
    adminAuth,registerAdmin,getGuideRequest,adminLogout,acceptGuide
}