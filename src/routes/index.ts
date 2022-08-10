import { Router, Request, Response } from "express";

import webRoute from "./web";

import authRoute from "./auth";

const router = Router();

router.use("/api/v1/web", webRoute);
router.use("/api/v1/auth", authRoute);
router.get("/", (req: Request, res: Response) =>
  res.send("Welcome to Project")
);

export default router;
