import sgMail from "@sendgrid/mail";
import { IEmailService } from "../email.interface";
import { emailConfig } from "../email.config";

export class SendgridProvider implements IEmailService {
	constructor() {
		sgMail.setApiKey(emailConfig.sendgridApiKey!);
	}

	async send(to: string, subject: string, html: string) {
		await sgMail.send({
			to,
			from: emailConfig.from,
			subject,
			html,
		});
	}
}
