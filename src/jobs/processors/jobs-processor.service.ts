import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../repository/jobs.repository';
import { JobId } from '../entities/job.entity';
import { JobStatus } from '../consts/job-status.const';
import { UrlCheckerService } from '../services/url-checker.service';

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

        this.repository.setStatus(job.id, JobStatus.inProgress);

        await Promise.all(job.urlChecks.map((check) => this.urlChecker.check(check.url)));

        this.repository.setStatus(job.id, JobStatus.completed);
    }
}
