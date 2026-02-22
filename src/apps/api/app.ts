import express from "express";
import * as Sentry from "@sentry/node";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { router } from "./routes";
import { errorHandler } from "../../middlewares/error.middleware";
import { sendTestEmailSuccess } from "../../modules/notification/notification.controller";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

app.use(router);
app.post("/test-email", sendTestEmailSuccess);


Sentry.setupExpressErrorHandler(app);

app.use(errorHandler);


//TODO: Implementar Caddy ao invés de Greenlock