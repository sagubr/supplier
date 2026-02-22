import Fastify from "fastify";
import { router } from "./routes";
import { errorHandler } from "../../middlewares/error.middleware";
import { Sentry } from "@/infra/observability/sentry";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

export const buildApp = async () => {
	const app = Fastify();

	await app.register(import("@fastify/helmet"));
	await app.register(import("@fastify/cors"));
	await app.register(import("@fastify/compress"));
	await app.register(import("@fastify/sensible"));

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(fastifySwagger, {
		openapi: {
			info: { title: "Quality API", version: "1.0.0" },
		},
		transform: jsonSchemaTransform,
	});

	app.register(fastifySwaggerUi, {
		routePrefix: "/docs",
	});

	await app.register(router);
	Sentry.setupFastifyErrorHandler(app);

	app.setErrorHandler(errorHandler);

	return app;
};

//TODO: Implementar Caddy ao invés de Greenlock
