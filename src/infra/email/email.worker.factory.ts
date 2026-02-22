import { emailService } from "./email.factory";
import { EmailWorker } from "./email.worker";

export function createEmailWorker(workerId: string) {
	return new EmailWorker(workerId, emailService);
}
