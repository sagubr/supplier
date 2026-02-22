import { CreateNotificationInput } from "./schema";

export interface INotificationService {
	sendTestEmailSuccess(email: CreateNotificationInput): Promise<void>;
	sendTestEmailError(): Promise<never>;
}