import type { UrlCheck } from '../../url-check';
import type { JobStatus } from './job-status';

export interface JobDetails {
    id: string;
    status: JobStatus;
    createdAt: string;
    updatedAt: string;
    urlChecks: UrlCheck[];
}
