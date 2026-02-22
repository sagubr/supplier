export function success<T>(data?: T, message = "Success") {
	return { success: true, message, data };
}

export function created<T>(data: T, message = "Created") {
	return { success: true, message, data };
}

export function noContent(message = "No content") {
	return { success: true, message };
}

export function error(message: string, code: number) {
	return { success: false, error: { message, code } };
}
