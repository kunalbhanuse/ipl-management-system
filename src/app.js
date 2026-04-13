import express from "express";
const app = express();
import authRouter from "./module/auth/auth.route.js";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

export default app;
