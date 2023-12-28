import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Guide from "../models/guideModel.js";
import generateToken from "../utils/userGenerateToken.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import nodeMailer from "nodemailer";
import Booking from "../models/bookingModel.js";
import otpGenerator from "generate-otp";
import OTP from "../models/OtpModel.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import Notification from "../models/notifications.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECERET,
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("email doest exist");
  }

  if (user.isBlocked) {
    res.status(400);
    throw new Error("Sorry you are blocked");
  }

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.LastName,
      email: user.email,
      mobile: user.mobile,
      image: user.ProfileImageName,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//Register user normal
const registerUser = asyncHandler(async (req, res) => {
  console.log('here');
  const { firstName, LastName, email, mobile, password } = req.body;

  const userExists = await User.findOne({ email });
  const MobileExists = await User.findOne({ mobile });

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

  // const user = await User.create({
  //   firstName,
  //   LastName,
  //   email,
  //   mobile,
  //   password,
  // });

  // if (user) {

  //   res.status(201).json({
  //     _id: user._id,
  //     firstName: user.firstName,
  //     email: user.email,
  //     LastName: user.LastName,
  //     mobile: user.mobile,
     
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid user data");
  // }
const otp = otpGenerator.generate(6, {
  digits: true,
  alphabets: false,
  upperCase: false,
  specialChars: false,
});

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: email,
  subject: "OTP for Verification",
  text: `Your OTP for verification is: ${otp}`,
};

try {
  await OTP.create({ email, otp });
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  res.status(200).json({ success: true });
} catch (error) {
  console.error("Error sending email:", error);
  res.status(500).json({ success: false, message: "Failed to send OTP" });
}


});

const verifyRegistration = asyncHandler(async(req,res)=>{

console.log('here');
  const { firstName, LastName, email, mobile, password,otp } = req.body;

 const otpDocument = await OTP.findOne({ email, otp });

 if (!otpDocument) {
 res.status(400)
 throw new Error('invalid OTP')
 }
    const user = await User.create({
      firstName,
      LastName,
      email,
      mobile,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        LastName: user.LastName,
        mobile: user.mobile,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
})

//register user using google
const googleRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, profileImageName } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    generateToken(res, userExists._id);

    res.status(201).json({
      _id: userExists._id,
      firstName: userExists.firstName,
      lastName: userExists.LastName,
      mobile: userExists.mobile,
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

        profileImageName: user.profileImageName,
        LastName: user.LastName,
        mobile: user.mobile,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

//Load the guide data to display
const getGuide = asyncHandler(async (req, res) => {
  const searchName = req.body.Searchquery;
  const activityFilter = req.body.activityFilter;
  // const priceRangeFilter = req.body.priceRangeFilter;
  let query = { isAuthorized: true, isBlocked: false, isActive: true };
  if (searchName) {
    query.$or = [
      { firstname: { $regex: new RegExp(searchName, "i") } },
      { Lastname: { $regex: new RegExp(searchName, "i") } },
      { Location: { $regex: new RegExp(searchName, "i") } },
    ];
  }
  if (activityFilter) {
    query.category = { $in: [activityFilter] };
  }
  // if (priceRangeFilter) {
  //   query.price = { $gte: priceRangeFilter[0], $lte: priceRangeFilter[1] };
  // }
  const guideData = await Guide.find(query).sort({ createdAt: -1 });
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

const checkAvailablity = asyncHandler(async (req, res) => {
  const { startDate, endDate, guideId } = req.body;
  const currentDate = new Date();

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  if (
    startDateObj.getTime() < currentDate.getTime() ||
    endDateObj.getTime() < currentDate.getTime()
  ) {
    res.status(400);
    throw new Error("Start date or end date is in the past");
  }

  if (endDateObj.getTime() < startDateObj.getTime()) {
    res.status(400);
    throw new Error("End date cannot be before the start date");
  }

  const overlappingBookings = await Booking.find({
    guideid: guideId,
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
      { startDate: { $gte: startDate, $lte: endDate } },
    ],
  });

  if (overlappingBookings.length > 0) {
    res.status(400);
    throw new Error("GUIDE IS NOT AVAILABLE IN THESE DATES");
  } else {
    return res.status(200).json({ available: true });
  }
});

const getBookingDatesGuide = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { guideId } = req.body;

  const bookings = await Booking.find({ guideid: guideId, status: "Accepted" });
  if (bookings) {
    res.status(200).json({ bookings });
  }
});

const GetGuidesOnDates = asyncHandler(async (req, res) => {
  const { Startdates, Enddates } = req.body;

  const startDate = new Date(Startdates);
  const endDate = new Date(Enddates);

  const overlappingBookings = await Booking.find({
    $or: [
      { startDate: { $gte: startDate, $lte: endDate } },
      { endDate: { $gte: startDate, $lte: endDate } },
      {
        $and: [
          { startDate: { $lte: startDate } },
          { endDate: { $gte: endDate } },
        ],
      },
    ],
  });

  const bookedGuideIds = overlappingBookings.map((booking) => booking.guideid);

  const availableGuides = await Guide.find({
    _id: { $nin: bookedGuideIds },
  });

  const availableGuideIds = availableGuides.map((guide) => guide._id);

  res.status(200).json({ availableGuideIds });
});

const createBooking = asyncHandler(async (req, res) => {
  const {
    userid,
    userName,
    guideid,
    Location,
    startDate,
    endDate,
    Days,
    totalAmount,
    userEmail,
    guideName,
    guideImage,
  } = req.body;

  try {
    const newBooking = await Booking.create({
      userEmail: userEmail,
      userid: userid,
      userName: userName,
      guidename: guideName,
      guideid: guideid,
      location: Location,
      startDate: startDate,
      endDate: endDate,
      totalDays: Days,
      totalAmount: totalAmount,
      guideImage: guideImage,
      status: "Pending",
    });

    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//logout user
const logout = asyncHandler(async (req, res) => {
  res.cookie("Userjwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "loggout successful" });
});

//getuserdata for table
const getUserData = asyncHandler(async (req, res) => {
  const user = await User.find({});
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404);

    throw new Error("Users data fetch failed.");
  }
});
const getBookingData = asyncHandler(async (req, res) => {
  console.log(req.query);
  const { id } = req.query;
  let query = {};
  const booking = await Booking.find({ userEmail: id }).sort({ createdAt: -1 });
  if (booking) {
    res.status(200).json({ booking });
  } else {
    res.status(404);

    throw new Error("Users data fetch failed.");
  }
});

//forgot password verify email function
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if the user with the given email exists
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "OTP for Verification",
    text: `Your OTP for verification is: ${otp}`,
  };

  try {
    await OTP.create({ email, otp });
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

//function to verift otp received from the user
const verifyAndChangePassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const otpDocument = await OTP.findOne({ email, otp });

    if (!otpDocument) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.password = password;

    await user.save();
    await otpDocument.remove();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update password" });
  }
});

//update the newpassword
const changePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  user.password = password;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, firstName, LastName, profileImage, mobile } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    user.firstName = firstName || user.firstName;
    user.LastName = LastName || user.LastName;

    user.mobile = mobile || user.mobile;

    if (profileImage) {
      const result = await cloudinary.uploader.upload(profileImage, {
        folder: "profilepic",
      });

      user.profileImageName = result.secure_url || user.profileImageName;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.LastName,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      image: updatedUser.ProfileImageName,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const { email, userId } = req.query;

  const user = await User.findOne({ email });
  // const guide = await Guide.findOne({ followers: userId })
  //   .populate("followers")
  //   .exec();
  //   console.log('g');
  if (user) {
    res.status(200).json({ user });
  }
});

const getFollowing = asyncHandler(async (req, res) => {
  console.log(req.query);
  const { userId } = req.query;
  const following = await Guide.find({ followers: userId }).sort({
    createdAt: -1,
  });
  if (following) {
    res.status(200).json({ following });
  }
});

const userGetNotifications = asyncHandler(async (req, res) => {
  console.log(req.query);
  const { receiverId } = req.query;

  try {
    const ObjectId = new mongoose.Types.ObjectId(receiverId);

    const notifications = await Notification.find({
      recieverId: ObjectId,
    }).sort({ createdAt: -1 });

    console.log(notifications);

    if (notifications) {
      res.status(200).json({ notifications });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  authUser,
  registerUser,
  googleRegister,
  logout,
  getGuide,
  getSingleGuide,
  createBooking,
  getUserData,
  forgotPassword,
  verifyAndChangePassword,
  changePassword,
  getBookingData,
  checkAvailablity,
  GetGuidesOnDates,
  getBookingDatesGuide,
  updateUserProfile,
  getProfile,
  getFollowing,
  userGetNotifications,
  verifyRegistration
};
