import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Category from "./categoryModels.js";
const guideSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    Lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    Location: {
      type: String,
    },
    password: {
      type: String,
    },
    idCardNumber: {
      type: String,
    },
    idCardFile: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    category: {
      type: [String],
    },
    isAuthorized: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
    },
    Coverpic: {
      type: String,
    },
    Language: {
      type: [String],
    },
    price: {
      type: String,
    },
    Description: {
      type: String,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User", // Assuming you have a User model
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
guideSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
guideSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Guide = mongoose.model("Guide", guideSchema);
export default Guide;
