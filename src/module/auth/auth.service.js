import User from "./auth.model.js";
import { sendMail } from "../../common/config/email.js";
import { generateResetToken } from "../../common/utils/jwt.utils.js";
import verifyEmailTemplate from "./templates/verifyEmail.templates.js";
import crypto from "crypto";
import ApiError from "../../common/utils/ApiError.js";

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
  const hashIncomingToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

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

export { registerService, verifyEmailService };
