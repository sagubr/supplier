import { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { success } from "@/shared/http/response";

const service = new NotificationService();

export async function sendTestEmailSuccess(req: Request, res: Response) {
  await service.sendTestEmailSuccess();
  res.json(success([]));
}

export async function sendTestEmailError(req: Request, res: Response) {
  await service.sendTestEmailError();
  res.json(success([]));
}
