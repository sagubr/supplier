import { emailService } from "../../infra/email/email.factory";
import { NotificationLimitExceeded } from "./errors/notification.error";
import { CreateNotificationInput } from "./schema";

export class NotificationService {
	async sendTestEmailSuccess(email: CreateNotificationInput) {
		await emailService.send(email.to, email.subject, email.body);
	}

	async sendTestEmailError() {
		throw new NotificationLimitExceeded();
	}
}
