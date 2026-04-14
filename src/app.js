import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import authRouter from "./module/auth/auth.route.js";
import ownerRouter from "./module/owner/owner.route.js";

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/owner", ownerRouter);

export default app;
