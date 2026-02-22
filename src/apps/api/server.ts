import { buildApp } from "./app";
import { initSentry } from "../../infra/observability/sentry";

const PORT = process.env.PORT || 3000;

initSentry("quality-api");

const start = async () => {
	try {
		const app = await buildApp();
		await app.listen({ port: Number(PORT), host: '0.0.0.0' });
		console.log(`Server running on port ${PORT}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

start();
