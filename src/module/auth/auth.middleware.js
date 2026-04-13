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
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Unauthorized",
    });
  }
};

export { isLoggedIn };
