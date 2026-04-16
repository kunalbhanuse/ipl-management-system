import { Router } from "express";
import { isLoggedIn, authorize } from "../auth/auth.middleware.js";
import * as sponserController from "./sponsor.controller.js";
const sponsorRouter = Router();

sponsorRouter.use(isLoggedIn, authorize("SPONSOR"));

sponsorRouter.post("/register", sponserController.register);
sponsorRouter.get("/getAllSponsor", sponserController.getAllSponsors);
sponsorRouter.get("/getSponsor/:id", sponserController.getSponsor);
sponsorRouter.put("/update/:id", sponserController.updateSponsor);
sponsorRouter.delete("/delete/:id", sponserController.deleteSponsor);

export default sponsorRouter;
