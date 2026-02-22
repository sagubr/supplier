import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function healthRouter(fastify: FastifyInstance, opts: FastifyPluginOptions) {
	fastify.get("/", async (_request, reply) => {
		return reply.send({ status: "ok" });
	});

	fastify.get("/debug-sentry", async (_request, _reply) => {
		throw new Error("Intentional error for testing");
	});
}
