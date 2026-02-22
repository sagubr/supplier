import { IEmailService } from "@/infra/email/email.interface";
import { NotificationLimitExceeded } from "./errors/notification.error";
import { CreateNotificationInput } from "./schema";
import { INotificationService } from "./notification.interface";

export class NotificationService implements INotificationService {
	constructor(private emailService: IEmailService) {}

	async sendTestEmailSuccess(email: CreateNotificationInput): Promise<void> {
		await this.emailService.send(email.to, email.subject, email.body);
	}

	async sendTestEmailError(): Promise<never> {
		throw new NotificationLimitExceeded();
	}
}
