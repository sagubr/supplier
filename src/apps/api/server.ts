import { app } from "./app";
import { initSentry } from "../../infra/observability/sentry";

const PORT = process.env.PORT || 3000;

initSentry("quality-api");

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
