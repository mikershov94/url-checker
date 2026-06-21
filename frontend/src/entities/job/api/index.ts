import { rtkApi } from '@shared';
import type { JobDetails } from '../model/types/job-details';
import type { JobInfo } from '../model/types/job-info';

interface CreateJobRequest {
    urls: string[];
}

interface CreateJobResponse {
    jobId: string;
}

export const POLLING_INTERVAL_MS = 1000;

export const jobsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getJobs: build.query<JobInfo[], void>({
            query: () => ({
                url: '/jobs',
            }),
            providesTags: ['Jobs'],
        }),

        getJobDetails: build.query<JobDetails, string>({
            query: (jobId) => ({
                url: `/jobs/${jobId}`,
            }),
            providesTags: (_result, _error, jobId) => [{ type: 'JobDetails', id: jobId }],
        }),

        createJob: build.mutation<CreateJobResponse, CreateJobRequest>({
            query: (body) => ({
                url: '/jobs',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Jobs'],
        }),

        cancelJob: build.mutation<void, string>({
            query: (jobId) => ({
                url: `/jobs/${jobId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, jobId) => [
                'Jobs',
                { type: 'JobDetails', id: jobId },
            ],
        }),
    }),
});

export const {
    useGetJobsQuery,
    useGetJobDetailsQuery,
    useCreateJobMutation,
    useCancelJobMutation,
} = jobsApi;
