import { FastifyRequest, FastifyReply } from "fastify";
import { success } from "@/shared/http/response";
import { createNotificationSchema } from "./schema";
import { notificationService } from "./notification.factory";

export async function sendTestEmailSuccess(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const body = createNotificationSchema.parse(request.body);
	await notificationService.sendTestEmailSuccess(body);
	return reply.send(success(null, "Notification sent"));
}

export async function sendTestEmailError(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	await notificationService.sendTestEmailError();
	return reply.send(success());
}
