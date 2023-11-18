import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Guide from "../models/guideModel.js";
import generateToken from "../utils/userGenerateToken.js";
import { ObjectId } from "mongodb";
import Booking from "../models/bookingModel.js"
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      mobile: user.mobile,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//Register user normal
const registerUser = asyncHandler(async (req, res) => {
 
  const { firstName, LastName, email, mobile, password } = req.body;

  const userExists = await User.findOne({ email });
  const MobileExists = await User.findOne({mobile})

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (MobileExists) {
    res.status(400);
    throw new Error("mobile already exists");
  }
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    LastName,
    email,
    mobile,
    password,
  });
 

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      lastName: user.LastName,
      mobile: user.mobile,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//register user using google
const googleRegister = asyncHandler(async (req, res) => {
  
  const { firstName, lastName, email, profileImageName } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    generateToken(res, userExists._id);

    res.status(201).json({
      _id: userExists._id,
      firstName: userExists.firstName,
      email: userExists.email,

      profileImageName: profileImageName,
    });
  } else {
    const user = await User.create({
      firstName: firstName,
      LastName: lastName,
      email: email,
      profileImageName: profileImageName,
    });
  
    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        lastName: user.LastName,
        profileImageName: user.profileImageName,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }

  
  }
});

//Load the guide data to display
const getGuide = asyncHandler(async (req, res) => {
  const guideData = await Guide.find({ isAuthorized: true,isBlocked:false });
  if (guideData) {
    res.status(200).json({ guideData });
  } else {
    res.status(404);

    throw new Error("Users data fetch failed.");
  }
});
const getSingleGuide = asyncHandler(async (req, res) => {
  const { id } = req.query;

 
  try {
    const objectId = new ObjectId(id);
    const guideData = await Guide.findOne({ _id: objectId });


    if (guideData) {
      res.status(200).json({ guideData });
    } else {
      res.status(404).json({ message: "Data not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

const createBooking  = asyncHandler(async(req,res)=>{

 
  const {userid,guideid,Location,startDate,endDate,Days,totalAmount,userEmail,guideName}=req.body
try {

   const newBooking = await Booking.create({
     userEmail: userEmail,
     userid: userid,
     guidename: guideName,
     guideid: guideid,
     location: Location,
     startDate: startDate,
     endDate: endDate,
     totalDays:Days,
     totalAmount:totalAmount,
     status: "Pending",
   });

   res.status(201).json({ success: true, data: newBooking });
} catch (error) {
   console.error(error);
   res.status(500).json({ success: false, error: "Internal Server Error" });
  
}
})

//logout user
const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "loggout successful" });
});

const changeStatus = asyncHandler(async (req, res) => {
 
 console.log('here');
});


const getUserData = asyncHandler(async(req,res)=>{
  const  user = await User.find({})
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404);

    throw new Error("Users data fetch failed.");
  }
})

export {
  authUser,
  registerUser,
  googleRegister,
  logout,
  getGuide,
  getSingleGuide,
  createBooking,
  changeStatus,
  getUserData

};
