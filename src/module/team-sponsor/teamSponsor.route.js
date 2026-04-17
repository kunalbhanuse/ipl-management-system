import { Router } from "express";
import { isLoggedIn, authorize } from "../auth/auth.middleware.js";
import * as teamSponserController from "./teamSponsor.controller.js";

const teamSponsorRouter = Router();

teamSponsorRouter.use(isLoggedIn, authorize("OWNER"));

teamSponsorRouter.post("/register", teamSponserController.registerTeamSponsor);
teamSponsorRouter.get(
  "/getAllteamSponsor",
  teamSponserController.getAllteamSponsor,
);
teamSponsorRouter.get(
  "/getAllteamSponsorById/:id",
  teamSponserController.getAllteamSponsorById,
);
teamSponsorRouter.put("/update/:id", teamSponserController.updateTeamSponsor);
teamSponsorRouter.delete("/delete/:id", teamSponserController.deleteTeamSposor);

export default teamSponsorRouter;
