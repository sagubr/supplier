import { FastifyRequest, FastifyReply } from "fastify";
import { NotificationService } from "./notification.service";
import { success } from "@/shared/http/response";
import { createNotificationSchema } from "./schema";

const service = new NotificationService();

export async function sendTestEmailSuccess(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const body = createNotificationSchema.parse(request.body);
	await service.sendTestEmailSuccess(body);
	return reply.send(success());
}

export async function sendTestEmailError(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	await service.sendTestEmailError();
	return reply.send(success());
}
