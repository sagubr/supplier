import { emailService } from "../../infra/email/email.factory";
import { NotificationLimitExceeded } from "./errors/notification.error";

export class NotificationService {
	async sendTestEmailSuccess() {
		await emailService.send(
			"sousagustavogarcia@gmail.com",
			"Teste de Email",
			"<h1>Funcionando 🚀</h1>",
		);
	}

	async sendTestEmailError() {
		throw new NotificationLimitExceeded();
	}
}
