import { emailService } from "../../infra/email/email.factory";
import { NotificationService } from "./notification.service";
import { INotificationService } from "./notification.interface";

export function createNotificationService(): INotificationService {
	return new NotificationService(emailService);
}

export const notificationService = createNotificationService();