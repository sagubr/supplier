export function success<T>(data?: T, message = "Success") {
	if (data) {
		return { success: true, message, data };
	}
	return { success: true, message };
}
