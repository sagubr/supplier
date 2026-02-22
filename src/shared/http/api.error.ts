export abstract class ApiError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean = true;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}

export class BadRequestError extends ApiError {
	constructor(message = "Bad request") {
		super(message, 400);
	}
}

export class ForbiddenError extends ApiError {
	constructor(message = "Forbidden") {
		super(message, 403);
	}
}

export class NotFoundError extends ApiError {
	constructor(message = "Resource not found") {
		super(message, 404);
	}
}
