import express from "express";
const app = express();
import authRouter from "./module/auth/auth.route.js";

app.use(express.json());

app.use("/api/auth", authRouter);

export default app;
