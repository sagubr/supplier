import { NotificationService } from "@/modules/notification/notification.service";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("NotificationService", () => {
	const mockEmailService = {
		send: vi.fn(),
	};

	const service = new NotificationService(mockEmailService);

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should send email successfully", async () => {
		mockEmailService.send.mockResolvedValueOnce(undefined);

		const result = await service.sendTestEmailSuccess({
			to: "user@example.com",
			subject: "Test",
			body: "Hello",
		});

		expect(mockEmailService.send).toHaveBeenCalledWith(
			"user@example.com",
			"Test",
			"Hello",
		);
	});

	it("should throw NotificationLimitExceeded error", async () => {
		await expect(service.sendTestEmailError()).rejects.toThrow(
			"Notification limit exceeded",
		);
	});
});
