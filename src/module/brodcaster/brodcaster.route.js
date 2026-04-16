import { Router } from "express";
import { isLoggedIn, authorize } from "../auth/auth.middleware.js";
import * as brodcasterController from "./brodcaster.service.js";

const brodcasterRouter = Router();

brodcasterRouter.use(isLoggedIn, authorize("BROADCASTER"));

brodcasterRouter.post("/register");
brodcasterRouter.get("/getAllBrodcaster");
brodcasterRouter.get("/getBrodcaster/:id");
brodcasterRouter.put("/update/:id");
brodcasterRouter.delete("/delete/:id");

export { brodcasterRouter };
