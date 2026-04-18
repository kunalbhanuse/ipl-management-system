import { Router } from "express";
import { isLoggedIn, authorize } from "../auth/auth.middleware.js";
import * as brodcasterController from "./brodcaster.controller.js";

const brodcasterRouter = Router();

brodcasterRouter.use(isLoggedIn, authorize("OWNER"));

brodcasterRouter.post("/register", brodcasterController.register);
brodcasterRouter.get(
  "/getAllBrodcaster",
  brodcasterController.getAllBrodcaster,
);
brodcasterRouter.get(
  "/getBrodcaster/:id",
  brodcasterController.getBrodcasterById,
);
brodcasterRouter.put("/update/:id", brodcasterController.updateBrodcaster);
brodcasterRouter.delete("/delete/:id", brodcasterController.deleteBrodcaster);

export default brodcasterRouter;
brodcasterRouter;
