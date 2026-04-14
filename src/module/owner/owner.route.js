import { Router } from "express";
const ownerRouter = Router();
import * as ownerController from "./owner.controller.js";

import { isLoggedIn, authorize } from "../auth/auth.middleware.js";

ownerRouter.use(isLoggedIn, authorize("OWNER"));

ownerRouter.post("/register", ownerController.register);
ownerRouter.get("/getAllOwners", ownerController.getAllOwners);
ownerRouter.get("/getOwner/:id", ownerController.getOwnerById);
ownerRouter.put("/updateOwner/:id", ownerController.updateOwner);
ownerRouter.delete("/deleteOwner/:id", ownerController.deleteOwner);

export default ownerRouter;
