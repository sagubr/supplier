import { FastifyInstance, FastifyPluginOptions } from "fastify";
import notificationRouter from "@/modules/notification/routes";
import healthRouter from "@/modules/health/routes";

export async function router(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions,
) {
	await fastify.register(notificationRouter, { prefix: "/notifications" });
	await fastify.register(healthRouter, { prefix: "/health" });
	await fastify.register(healthRouter, { prefix: "/error" });
}
