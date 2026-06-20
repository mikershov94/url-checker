import { Injectable } from '@nestjs/common';
import { JobsRepository } from './repository/jobs.repository';
import { JobId, UrlCheck } from './entities/job.entity';
import { JobInfo } from './interfaces/job-info.interface';
import { UrlCheckStatus } from './consts/url-check-status.const';

@Injectable()
export class JobsService {
    constructor(private readonly repository: JobsRepository) {}

    createJob(urls: string[]): JobId {
        return this.repository.create(urls);
    }

    getJobsList(): JobInfo[] {
        const jobs = this.repository.getList();

        return jobs.map((job) => {
            const successCount = job.urlChecks.reduce(
                (acc, urlInfo) => (urlInfo.status === UrlCheckStatus.success ? (acc += 1) : acc),
                0,
            );

            const errorCount = job.urlChecks.reduce(
                (acc, urlInfo) => (urlInfo.status === UrlCheckStatus.error ? (acc += 1) : acc),
                0,
            );

            return {
                id: job.id,
                status: job.status,
                createdAt: job.createdAt,
                updatedAt: job.updatedAt,
                urlCount: job.urlChecks.length,
                successCount,
                errorCount,
            };
        });
    }

    getUrlChecks(jobId: string): UrlCheck[] {
        return this.repository.getUrlChecksByJobId(jobId);
    }

    cancelJob(id: JobId): void {
        this.repository.markCancelled(id);
    }
}
