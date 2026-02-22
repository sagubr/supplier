import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/shared/http/api.error";

export function errorHandler(
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			success: false,
			error: { message: err.message, code: err.statusCode },
		});
	}

	if (err instanceof Error) {
		return res.status(500).json({
			success: false,
			error: {
				message: err.message || "Internal server error",
				code: 500,
			},
		});
	}

	return res.status(500).json({
		success: false,
		error: { message: "Internal server error", code: 500 },
	});
}
