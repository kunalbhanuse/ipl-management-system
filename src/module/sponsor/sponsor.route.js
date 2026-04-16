import { Router } from "express";
import { isLoggedIn, authorize } from "../auth/auth.middleware.js";
import * as sponserController from "./sponsor.controller.js";
const sponsorRouter = Router();

sponsorRouter.use(isLoggedIn, authorize("SPONSOR"));

sponsorRouter.post("/register", sponserController.register);

export default sponsorRouter;
