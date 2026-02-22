import { z } from "zod";

export const createNotificationSchema = z.object({
	to: z.string().email(),
	subject: z.string(),
	body: z.string(),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
