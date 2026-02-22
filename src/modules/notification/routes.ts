import { Router } from "express";
import {
	sendTestEmailError,
	sendTestEmailSuccess,
} from "./notification.controller";

const notificationRouter = Router();

notificationRouter.post("/send-success", sendTestEmailSuccess);
notificationRouter.post("/send-error", sendTestEmailError);

export default notificationRouter;

