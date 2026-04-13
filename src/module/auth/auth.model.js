import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
      required: [true, "Name is required "],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required Buddy"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["PLAYER", "OWNER", "BROADCASTER", "SPONSOR"],
      required: [true, "role is Required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: { type: String, select: false },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    forgetPasswordToken: { type: String, select: false },
    forgetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);
