import User from "./auth.model.js";
import { sendMail } from "../../common/config/email.js";
import { generateResetToken } from "../../common/utils/jwt.utils.js";
import verifyEmailTemplate from "./templates/verifyEmail.templates.js";
import crypto from "crypto";
import ApiError from "../../common/utils/ApiError.js";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../../common/utils/jwt.utils.js";

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
const generateRefreshAndAccessToken = (payload) => {
  const refreshToken = generateRefreshToken(payload);
  const accessToken = generateAccessToken(payload);
  return { refreshToken, accessToken };
};

const registerService = async ({ name, email, password, role }) => {
  const { rawToken, hashedToken } = await generateResetToken();
  const user = await User.create({
    name,
    email,
    password,
    role,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: Date.now() + 5 * 60 * 1000,
  });

  const verificationLink = `http://localhost:8000/api/auth/verifyEmail?token=${rawToken}`;
  // const html = verifyEmailTemplate(user.name, verificationLink);

  await sendMail(email, "Verify Email !", verificationLink);

  return user;
};

const verifyEmailService = async ({ token }) => {
  if (!token) {
    throw ApiError.notFound("Token not Found");
  }
  const hashIncomingToken = hashToken(token);

  const user = await User.findOne({
    emailVerificationToken: hashIncomingToken,
    emailVerificationExpires: { $gt: Date.now() },
  }).select("+emailVerificationToken +emailVerificationToken");

  if (!user) {
    throw ApiError.badRequest("Invalid or Expired Token");
  }
  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  return user;
};

const loginServices = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw ApiError.badRequest("User Does not Exits with this email");
  }
  if (!user.isVerified) {
    throw ApiError.forbidden("Verify email before Login");
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw ApiError.badRequest("Email or password Wrong");
  }

  const { refreshToken, accessToken } = generateRefreshAndAccessToken(user);

  user.refreshToken = hashToken(refreshToken);
  await user.save();
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { userObj, accessToken, refreshToken };
};
export { registerService, verifyEmailService, loginServices };
