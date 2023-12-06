import jwt from "jsonwebtoken";

const guideGenerateToken = (res, guideId) => {
  const token = jwt.sign({ guideId }, process.env.JWT_CODE, {
    expiresIn: "30d",
  });

  res.cookie("Guidejwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default guideGenerateToken;