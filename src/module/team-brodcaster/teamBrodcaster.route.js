import { Router } from "express";
import { isLoggedIn, authorize } from "../auth/auth.middleware.js";
import * as teamBrodcaster from "./teamBrodcaster.controller.js";

const teamBrodcasterRouter = Router();

teamBrodcasterRouter.use(isLoggedIn, authorize("OWNER"));

teamBrodcasterRouter.post("/register", teamBrodcaster.register);
teamBrodcasterRouter.get(
  "/getAllteamBrodcaster",
  teamBrodcaster.getallteamBrodcaster,
);

teamBrodcasterRouter.get(
  "/getteamBrodcaster/:id",
  teamBrodcaster.teamBrodcasterById,
);

teamBrodcasterRouter.put("/update/:id", teamBrodcaster.updateTeamBrodcaster);
teamBrodcasterRouter.delete("/delete/:id", teamBrodcaster.deleteTeamBrodcaster);
export default teamBrodcasterRouter;
