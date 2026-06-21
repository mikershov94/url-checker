import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../repository/jobs.repository';
import { JobId } from '../entities/job.entity';
import { JobStatus } from '../consts/job-status.const';
import { UrlCheckerService } from '../services/url-checker.service';
import { isFailedCode } from '../helpers/is-failed-code.helper';
import { generateHttpError } from '../helpers/generate-http-error.helper';

@Injectable()
export class JobsProcessor {
    constructor(
        private readonly repository: JobsRepository,
        private readonly urlChecker: UrlCheckerService,
    ) {}

    public async process(jobId: JobId): Promise<void> {
        const job = this.repository.findById(jobId);

        if (!job) {
            return;
        }

        const startedAt = this.repository.markInProgress(job.id);

        await Promise.all(
            job.urlChecks.map((check) => this.processUrl(job.id, check.url, startedAt)),
        );

        this.repository.setStatus(job.id, JobStatus.completed);
    }

    private async processUrl(jobId: JobId, url: string, startedAt: Date): Promise<void> {
        const httpCode = await this.urlChecker.check(url);

        if (isFailedCode(httpCode)) {
            const errorMessage = generateHttpError(httpCode);

            this.repository.markUrlCheckError(jobId, url, {
                httpCode,
                message: errorMessage!,
            });
        }

        const now = new Date();
        const duration = now.getTime() - startedAt.getTime();

        this.repository.markUrlCheckSuccess(jobId, url, {
            httpCode,
            endedAt: now,
            duration,
        });
    }
}
