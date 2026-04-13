import * as authService from "./auth.service.js";
import { validateRegister } from "./dto/register.dto.js";
import { validateLogin } from "./dto/login.dto.js";
import ApiResponse from "../../common/utils/ApiResponse.js";
import ApiError from "../../common/utils/ApiError.js";
import { success } from "zod";

const register = async (req, res) => {
  try {
    const validReqBody = await validateRegister.parseAsync(req.body);
    const user = await authService.registerService(validReqBody);
    if (!user) {
      throw ApiError.badRequest("user creation failed ");
    }
    return ApiResponse.created(res, "user created succesfully", user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
const verifyEmail = async (req, res) => {
  try {
    const verifiedUser = await authService.verifyEmailService(req.query);
    return ApiResponse.ok(res, "Email Verified SuccefullY !", verifiedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server internal error",
    });
  }
};

const login = async (req, res) => {
  const validateReqBody = await validateLogin.parseAsync(req.body);
};

export { register, login, verifyEmail };
