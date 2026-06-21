import type { JobId } from '@entities/job/model/types/job-id';

export interface CreateJobResponse {
    jobId: JobId;
}

export interface CreateJobRequest {
    urls: string[];
}
