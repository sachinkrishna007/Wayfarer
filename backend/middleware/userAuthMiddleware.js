import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.Userjwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_CODE);

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        res.status(400);
        throw new Error("Not authorized, user not found");
      }

      if (user.isBlocked) {
        console.log('sdfsd');
        res.status(400);
        throw new Error("User is blocked");
      }

      req.user = user;
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
