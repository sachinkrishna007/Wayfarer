import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Guide from "../models/guideModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.Guidejwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_CODE);

      req.user = await Guide.findById(decoded.guideId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
