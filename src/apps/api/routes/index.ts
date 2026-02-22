import { Router } from "express";
import notificationRouter from "@/modules/notification/routes";
import healthRouter from "@/modules/health/routes";

export const router = Router();

router.use("/notifications", notificationRouter);
router.use("/health", healthRouter);

router.use("/error", healthRouter);
