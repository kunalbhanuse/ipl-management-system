import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import authRouter from "./module/auth/auth.route.js";
import ownerRouter from "./module/owner/owner.route.js";
import teamRouter from "./module/team/team.route.js";
import playerRouter from "./module/player/player.route.js";
import sponsorRouter from "./module/sponsor/sponsor.route.js";
// import brodcasterRouter from "./module/brodcaster/brodcaster.route.js";
import teamSponsorRouter from "./module/team-sponsor/teamSponsor.route.js";

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/team", teamRouter);
app.use("/api/player", playerRouter);
app.use("/api/sponsor", sponsorRouter);
// app.use("/api/brodcaster", brodcasterRouter);
app.use("/api/teamSponsor", teamSponsorRouter);

export default app;
