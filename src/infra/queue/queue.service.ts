import { logger } from "../observability/logger.config";
import { queueRepository } from "./queue.repository";
import {
	QueueJob,
	QueueJobPayloadSchema,
	QueueJobStatus,
	QueueJobType,
} from "./queue.types";

class QueueService {
	async dispatch(
		workerId: string,
		type: QueueJobType,
	): Promise<QueueJob | null> {
		const job = await queueRepository.fetchAndLockNextJob(workerId, type);
		if (!job) return null;

		try {
			const payload = QueueJobPayloadSchema.parse(job.payload);
			return { ...job, payload };
		} catch (err) {
			logger.error({ err, jobId: job.id }, "Invalid payload");

			await queueRepository.updateJob(job.id, {
				status: QueueJobStatus.FAILED,
				last_error: String(err),
				locked_at: null,
				locked_by: null,
			});

			return null;
		}
	}

	async complete(jobId: number) {
		await queueRepository.updateJob(jobId, {
			status: QueueJobStatus.DONE,
			locked_at: null,
			locked_by: null,
		});
	}

	async fail(job: QueueJob, error: unknown) {
		await queueRepository.failJob(job.id, job.max_attempts, error);
	}

	async cleanup(days = 30) {
		await queueRepository.deleteOldProcessedJobs(days);
	}

	async watchdog() {
		await queueRepository.resetStaleJobs(5);
	}
}

export const queueService = new QueueService();
