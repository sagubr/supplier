import { FastifyRequest, FastifyReply, FastifyError } from "fastify";
import { ApiError } from "@/shared/http/api.error";

export function errorHandler(
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	if (error instanceof ApiError) {
		return reply.status(error.statusCode).send({
			success: false,
			error: { message: error.message, code: error.statusCode },
		});
	}

	if (error instanceof Error) {
		return reply.status(500).send({
			success: false,
			error: {
				message: error.message || "Internal server error",
				code: 500,
			},
		});
	}

	return reply.status(500).send({
		success: false,
		error: { message: "Internal server error", code: 500 },
	});
}
