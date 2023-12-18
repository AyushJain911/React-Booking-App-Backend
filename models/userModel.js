import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false },
    img: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
