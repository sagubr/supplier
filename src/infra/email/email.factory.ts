import { emailConfig } from "./email.config";
import { IEmailService } from "./email.interface";
import { SendgridProvider } from "./providers/sendgrid.provider";
import { SmtpProvider } from "./providers/smtp.provider";

const strategies = {
	sendgrid: SendgridProvider,
	smtp: SmtpProvider,
};

function createEmailService(): IEmailService {
	const Strategy = strategies[emailConfig.provider];

	if (!Strategy) {
		throw new Error("Invalid email provider");
	}

	return new Strategy();
}

export const emailService = createEmailService();
