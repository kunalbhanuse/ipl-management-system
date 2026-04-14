import ApiError from "../../common/utils/ApiError.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

const isLoggedIn = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Access Token Missing, Please Login First");
    }

    const token = header.split(" ")[1];
    if (!token) {
      throw ApiError.unauthorized("Access Token Missing");
    }
    const verifiedToken = verifyAccessToken(token);

    const user = await User.findById(verifiedToken.id);
    if (!user) {
      throw ApiError.unauthorized("User not Found");
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Unauthorized",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw ApiError.unauthorized("Login required");
    }
    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden(
        "You do not have permission to perform this action",
      );
    }
    next();
  };
};

export { isLoggedIn, authorize };
