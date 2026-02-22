import dotenv from "dotenv";
import { z } from "zod";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;

dotenv.config({ path: envFile });

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z
		.enum(["development", "production", "staging"])
		.default("development"),
	SERVICE_NAME: z.string().default('quality-supplier'),
	LOG_LEVEL: z.string().default("info"),
	
	// Database - obrigatório em produção
	DB_HOST: z.string().min(1, "DB_HOST é obrigatório"),
	DB_PORT: z.coerce.number().default(3306),
	DB_USER: z.string().min(1, "DB_USER é obrigatório"),
	DB_PASS: z.string(),
	DB_NAME: z.string().min(1, "DB_NAME é obrigatório"),
	DATABASE_URL: z.string().url("DATABASE_URL deve ser uma URL válida").optional(),
	
	// Database Pool Configuration
	DB_CONNECTION_LIMIT: z.coerce.number().default(20),
	DB_ACQUIRE_TIMEOUT: z.coerce.number().default(60000),
	DB_TIMEOUT: z.coerce.number().default(60000),
	
	// Rate Limiting
	RATE_LIMIT_MAX: z.coerce.number().default(100),
	RATE_LIMIT_TIME_WINDOW: z.string().default("1 minute"),
	
	// JWT - obrigatório
	JWT_SECRET: z.string().min(32, "JWT_SECRET deve ter pelo menos 32 caracteres"),
	JWT_EXPIRES_IN: z.enum(["15m", "30m", "1h", "6h", "12h", "1d", "7d"]).default("1h"),
	
	// Email
	EMAIL_PROVIDER: z.enum(["sendgrid", "smtp"]).default("sendgrid"),
	SENDGRID_API_KEY: z.string().optional(),
	SMTP_HOST: z.string().optional(),
	SMTP_PORT: z.coerce.number().optional(),
	SMTP_USER: z.string().optional(),
	SMTP_PASS: z.string().optional(),
	EMAIL_FROM_NAME: z.string().min(1, "EMAIL_FROM_NAME é obrigatório"),
	EMAIL_FROM_ADDRESS: z.string().email("EMAIL_FROM_ADDRESS deve ser um email válido"),
	EMAIL_MAX_ATTEMPTS: z.coerce.number().default(3),
	EMAIL_BATCH_SIZE: z.coerce.number().default(10),
	
	// Observability
	SENTRY_DSN: z.string().url("SENTRY_DSN deve ser uma URL válida").optional(),
}).refine((data) => {
	// Se provider é sendgrid, API key é obrigatória
	if (data.EMAIL_PROVIDER === "sendgrid" && !data.SENDGRID_API_KEY) {
		return false;
	}
	// Se provider é smtp, configurações smtp são obrigatórias
	if (data.EMAIL_PROVIDER === "smtp" && (!data.SMTP_HOST || !data.SMTP_PORT || !data.SMTP_USER || !data.SMTP_PASS)) {
		return false;
	}
	return true;
}, {
	message: "Configurações de email incompletas para o provider selecionado"
});

export const env = envSchema.parse(process.env);
