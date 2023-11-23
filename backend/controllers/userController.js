import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Guide from "../models/guideModel.js";
import generateToken from "../utils/userGenerateToken.js";
import { ObjectId } from "mongodb";
import nodeMailer from "nodemailer";
import Booking from "../models/bookingModel.js";
import otpGenerator from "generate-otp";
import OTP from "../models/OtpModel.js";

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
  const guideData = await Guide.find({ isAuthorized: true, isBlocked: false });
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

const createBooking = asyncHandler(async (req, res) => {
  const {
    userid,
    guideid,
    Location,
    startDate,
    endDate,
    Days,
    totalAmount,
    userEmail,
    guideName,
    guideImage
  } = req.body;
  try {
    const newBooking = await Booking.create({
      userEmail: userEmail,
      userid: userid,
      guidename: guideName,
      guideid: guideid,
      location: Location,
      startDate: startDate,
      endDate: endDate,
      totalDays: Days,
      totalAmount: totalAmount,
      guideImage:guideImage,
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
  res.cookie("jwt", "", {
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
  const { id } = req.query;

  const booking = await Booking.find({ userEmail: id })
  if (booking) {
    res.status(200).json({ booking });
  } else {
    res.status(404);

    throw new Error("Users data fetch failed.");
  }
});

//forgot password verify email function
const forgotPassword = asyncHandler(async (req, res) => {
  console.log(req.body);

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
  console.log(otp);

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
  console.log(req.body);
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
};
