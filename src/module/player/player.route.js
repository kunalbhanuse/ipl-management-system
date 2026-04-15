import { Router } from "express";
import { isLoggedIn, authorize } from "../auth/auth.middleware.js";
import * as playerController from "./player.controller.js";

const playerRouter = Router();

playerRouter.use(isLoggedIn, authorize("OWNER"));

playerRouter.post("/register", playerController.register);
playerRouter.get("/getAllPlayers", playerController.getAllPlayers);
playerRouter.post("/myTeamPlayers", playerController.myTeamPlayers);
playerRouter.post("/getPlayer/:id", playerController.getAllPlayersById);
playerRouter.put("/update/:id", playerController.updatePlayerByID);
playerRouter.delete("/delete/:id", playerController.deletePlayerById);

export default playerRouter;
