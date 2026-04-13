import * as authService from "./auth.service.js";
import { validateRegister } from "./dto/register.dto.js";
import { validateLogin } from "./dto/login.dto.js";
import { validateForgetPassword } from "./dto/forgetPassword.dto.js";
import { validateResetPassword } from "./dto/resetPassword.dto.js";
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
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server internal error",
    });
  }
};

const login = async (req, res) => {
  try {
    const validateReqBody = await validateLogin.parseAsync(req.body);

    const { userObj, accessToken, refreshToken } =
      await authService.loginServices(validateReqBody);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });

    return ApiResponse.ok(res, "login SucceFull", {
      accessToken,
      user: userObj,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    const user = await authService.logoutService(req.user);
    res.clearCookie("refreshToken");
    return ApiResponse.ok(res, "Logout Succefully !", user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getMeServices(req.user);

    return ApiResponse.ok(res, "user feached Succefully ", user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "internal server error",
    });
  }
};

const refreshTokens = async (req, res) => {
  // console.log("req.cookies.refreshToken =", req.cookies.refreshToken);
  try {
    const { userObj, newAccessToken, newRefreshToken } =
      await authService.refreshTokensServises(req.cookies.refreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
    });

    return ApiResponse.ok(res, "Access token revised Succesfully", {
      userObj,
      newAccessToken,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const validateReqBody = await validateForgetPassword.parseAsync(req.body);
    const message = await authService.forgetPasswordService(validateReqBody);
    return ApiResponse.ok(res, "Forget password mail sent", message);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const validateReqBody = await validateResetPassword.parseAsync(req.body);
    await authService.resetPasswordService(validateReqBody);
    return ApiResponse.ok(res, "Password reset Successfully !");
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};
export {
  register,
  login,
  verifyEmail,
  getMe,
  logout,
  refreshTokens,
  forgetPassword,
  resetPassword,
};
