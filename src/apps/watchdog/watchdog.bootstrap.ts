import { logger } from "@/infra/observability/logger.config";
import { env } from "../../config/env.config";
import { createScheduler } from "../scheduler/scheduler";
import { queueService } from "@/infra/queue/queue.service";

(async () => {
	logger.info(
		{ service: "queue-watchdog", env: env.NODE_ENV },
		"Starting Queue Watchdog...",
	);

	const inspectScheduler = createScheduler(() => queueService.watchdog(), {
		name: "queue-watchdog",
		interval: 60_000,
	});

	const cleanupScheduler = createScheduler(() => queueService.cleanup(30), {
		name: "queue-cleanup",
		interval: 24 * 60 * 60 * 1000,
	});

	inspectScheduler.start();
	cleanupScheduler.start();
})();
