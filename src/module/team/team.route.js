import { Router } from "express";
import * as teamController from "./team.controller.js";
import { authorize, isLoggedIn } from "../auth/auth.middleware.js";
const teamRouter = Router();

teamRouter.use(isLoggedIn, authorize("OWNER"));

teamRouter.post("/register", teamController.register);
teamRouter.get("/getAllTeams", teamController.getAllTeams);
teamRouter.get("/getTeam/:id", teamController.getTeamById);
teamRouter.put("/update/:id", teamController.updateTeam);
teamRouter.delete("/delete/:id", teamController.deleteTeam);
export default teamRouter;
