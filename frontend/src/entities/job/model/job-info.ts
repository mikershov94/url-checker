import type { JobStatus } from './job-status';

export interface JobInfo {
    id: string;
    status: JobStatus;
    createdAt: string;
    updatedAt: string;
    urlCount: number;
    successCount: number;
    errorCount: number;
}
