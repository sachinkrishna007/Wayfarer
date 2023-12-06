import asyncHandler from "express-async-handler";

import guideGenerateToken from "../utils/guideGenerateToken.js";
import Guide from "../models/guideModel.js";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
const authGuide = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const guide = await Guide.findOne({ email });

  if (!guide) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  if (guide.isBlocked) {
    res.status(400);
    throw new Error("Sorry, you are blocked. Please contact the admin.");
  }

  if (!guide.isAuthorized) {
    res.status(400);
    throw new Error("Approval pending");
  }

  if (guide && (await guide.matchPassword(password))) {
    // If the password matches, generate and send a token
    guideGenerateToken(res, guide._id);

    res.status(201).json({
      success: true,
      data: {
        _id: guide._id,
        firstName: guide.firstname,
        lastName: guide.Lastname,
        Location: guide.Location,
        email: guide.email,
        mobile: guide.mobile,
        isAuthorized: guide.isAuthorized,
        Language: guide.Language,
        price: guide.price,
        profileImage: guide.profileImage,
        idCardFile: guide.idCardFile,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const registerGuide = asyncHandler(async (req, res) => {
  const {
    firstName,
    LastName,
    email,
    mobile,
    password,
    Location,
    idCardNumber,
    profileImage,
    idCardFile,
  } = req.body;
  const result = await cloudinary.uploader.upload(profileImage, {
    folder: "profilepic",
  });
  const documents = await cloudinary.uploader.upload(idCardFile, {
    folder: "documents",
  });
  const guideExists = await Guide.findOne({ email });

  if (guideExists) {
    res.status(400);
    throw new Error("Guide already exists");
  }

  const Guides = await Guide.create({
    firstname: firstName,
    Lastname: LastName,
    email,
    mobile,
    password,
    Location,
    idCardNumber,
    idCardFile: documents.secure_url,
    profileImage: result.secure_url,
  });

  if (Guides) {
    res.status(201).json({ sucess: true });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getBookingData = asyncHandler(async (req, res) => {
  const { id } = req.query;
console.log(id);
  const booking = await Booking.find({ guideid: id })
  const user = await User.find({email:booking.userEmail})

  
  if (booking,user) {
    res.status(200).json({ booking });
  } else {
    res.status(404);

    throw new Error("Users data fetch failed.");
  }
});

const guideLogout = asyncHandler(async (req, res) => {
  res.cookie("Guidejwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "loggout successful" });
});

const guideAddLanguage = asyncHandler(async (req, res) => {
  const { Lan, guideId } = req.body;
  console.log(req.body);
  const guide = await Guide.findOne({ email: guideId });

  if (!guide) {
    res.status(400);
    throw new Error("Data fetch failed.");
  }
  if (guide.Language.includes(Lan)) {
    console.log('jb');
    res.status(400);
    throw new Error("Language already exists.");
  }
  
  guide.Language.push(Lan);
  const saved = await guide.save();
  if (saved) {
    res
      .status(200)
      .json({ success: true, message: "Language added successfully", guide });
  }
});

const guideAddPrice = asyncHandler(async (req, res) => {
  const { price, guideId } = req.body;

  const guide = await Guide.findOne({ email: guideId });

  if (!guide) {
    return res.status(404).json({ success: false, message: "Guide not found" });
  }

  if (guide.price) {
    guide.price = price;
  } else {
    guide.price = price;
  }

  await guide.save();
  res
    .status(200)
    .json({ success: true, message: "Language added successfully", guide });
});
const guideAddDescription = asyncHandler(async (req, res) => {
  const { description, guideId } = req.body;

  const guide = await Guide.findOne({ email: guideId });

  if (!guide) {
    return res.status(404).json({ success: false, message: "Guide not found" });
  }

  guide.Description = description;

  await guide.save();
  res
    .status(200)
    .json({ success: true, message: "Language added successfully", guide });
});

const getGuideData = asyncHandler(async (req, res) => {
  const { guideId } = req.body;

  const guideData = await Guide.find({ email: guideId });

  if (guideData) {
    res.status(200).json({ guideData });
  } else {
    res.status(404);

    throw new Error(" data fetch failed.");
  }
});

const deleteLanguage = asyncHandler(async(req,res)=>{
  const{guideId,lan}=req.body
  console.log(req.body);
const guide = await Guide.findOneAndUpdate(
  { _id: guideId },
  { $pull: { Language: lan } },
  { new: true }
);
return res.status(200).json({ message: "Language deleted successfully" });
})

const GuideActivateAccount = asyncHandler(async (req, res) => {
  console.log(req.body);

  const guideId = req.body.guideId;


    const guide = await Guide.findById(guideId);

    if (!guide) {
      res.status(404);

      throw new Error(" failed.");
    }

 if (!guide.Language || !guide.price || !guide.Description) {
   res.status(400);
   throw new Error(
     "Guide must have Language, price, and Description before activation."
   );
 }

    guide.isActive = !guide.isActive;
    const updatedGuide = await guide.save();

    res.status(200).json({ success: true, guide: updatedGuide });
  
   
});


const changePassword = asyncHandler(async (req, res) => {
  const { guideId, oldPassword, password } = req.body;

  const guide = await Guide.findOne({ email: guideId });

  if (!guide) {
    res.status(404);
    throw new Error("Guide not found");
  }

  const isPasswordMatch = await guide.matchPassword(oldPassword);

  if (isPasswordMatch) {
    guide.password = password;
    await guide.save();

    res.status(200).json({ success: true });
  } else {
    res.status(401);
    throw new Error("Incorrect old password");
  }
});

export {
  registerGuide,
  authGuide,
  guideLogout,
  guideAddLanguage,
  guideAddPrice,
  getGuideData,
  guideAddDescription,
  changePassword,
  getBookingData,
  deleteLanguage,
  GuideActivateAccount
};
