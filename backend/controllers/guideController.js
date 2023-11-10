import asyncHandler from "express-async-handler";

import guideGenerateToken from "../utils/guideGenerateToken.js";
import Guide from "../models/guideModel.js";

const authGuide = asyncHandler(async (req, res) => {
  console.log("reached");
  const { email, password } = req.body;

  const guide = await Guide.findOne({ email });
  console.log(guide);

  if (guide && (await guide.matchPassword(password))) {
    if (guide.isAuthorized) {
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
          price:guide.price
        },
      });
    } else {
      res.status(401).json({
        success: false,
        error: "Invalid user data",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "Invalid user data",
    });
  }
});

const registerGuide = asyncHandler(async (req, res) => {
  const {
    firstname,
    Lastname,
    email,
    mobile,
    password,
    Location,
    idCardNumber,
  } = req.body;
  console.log(req.body);

  const guideExists = await Guide.findOne({ email });

  if (guideExists) {
    res.status(400);
    throw new Error("Guide already exists");
  }

  let idCardFile = req.file.filename;
  console.log(idCardFile);

  const Guides = await Guide.create({
    firstname,
    Lastname,
    email,
    mobile,
    password,
    Location,
    idCardNumber,
    idCardFile,
  });

  if (Guides) {
    console.log("here");
    res.status(201).json({ sucess: true });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const guideLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "loggout successful" });
});
const guideAddLanguage = asyncHandler(async (req, res) => {
  console.log("here");
  const { Lan, guideId } = req.body;
  console.log(req.body);
  const guide = await Guide.findOne({ email: guideId });
  console.log(guide);
  if (!guide) {
    return res.status(404).json({ success: false, message: "Guide not found" });
  } else if (guide.Language.length >= 3) {
    return res
      .status(400)
      .json({ success: false, message: "Maximum language limit reached" });
  } else {
    guide.Language.push(Lan);
    await guide.save();
    res
      .status(200)
      .json({ success: true, message: "Language added successfully", guide });
  }
});
const guideAddPrice = asyncHandler(async (req, res) => {
  console.log("here");
  const { price, guideId } = req.body;
  console.log(req.body);
  const guide = await Guide.findOne({ email: guideId });
  console.log(guide);
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

export { registerGuide, authGuide, guideLogout, guideAddLanguage ,guideAddPrice};
