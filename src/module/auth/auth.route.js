import { Router } from "express";
import * as authController from "./auth.controller.js";
import { isLoggedIn } from "./auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.get("/verifyEmail", authController.verifyEmail);
authRouter.post("/login", authController.login);
authRouter.post("/logout", isLoggedIn, authController.logout);
authRouter.get("/getMe", isLoggedIn, authController.getMe);
authRouter.post("/refreshTokens", authController.refreshTokens);
authRouter.post("/forgetPassword", authController.forgetPassword);
authRouter.put("/resetPassword", authController.resetPassword);

export default authRouter;
