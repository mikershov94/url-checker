import type { RootState } from '@app/store';
import { skipToken } from '@reduxjs/toolkit/query';
import type { FC } from 'react';
import { JobStatus, type JobInfo } from '@entities/job';
import { useSelector } from 'react-redux';
import { UrlChecksTable } from '@entities/url-check';
import { apiErrors, Card, EmptyState, ErrorMessage, Loader } from '@shared';
import { POLLING_INTERVAL_MS, useGetJobDetailsQuery } from '../../api';
import { JobMeta } from '../JobMeta/JobMeta';

export interface JobDetailsPanelProps {
    jobs: JobInfo[];
}

export const JobDetailsPanel: FC<JobDetailsPanelProps> = ({ jobs }) => {
    const selectedJobId = useSelector((state: RootState) => state.jobs.selectedJobId);
    const selectedJob = jobs.find((job) => job.id === selectedJobId);

    const isSelectedJobFinal =
        selectedJob?.status === JobStatus.completed ||
        selectedJob?.status === JobStatus.failed ||
        selectedJob?.status === JobStatus.cancelled;

    const shouldPoll = Boolean(selectedJobId) && !isSelectedJobFinal;

    const {
        data: job,
        isLoading,
        error,
    } = useGetJobDetailsQuery(selectedJobId ?? skipToken, {
        pollingInterval: shouldPoll ? POLLING_INTERVAL_MS : 0,
        skipPollingIfUnfocused: true,
    });

    if (error) {
        return (
            <Card title="Детали задания">
                <ErrorMessage>{apiErrors.GET_JOB_DETAILS_ERROR}</ErrorMessage>;
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card title="Детали задания">
                <Loader />
            </Card>
        );
    }

    if (!job) {
        return (
            <Card title="Детали задания">
                <EmptyState
                    title="Задание не выбрано"
                    description="Выберите задание из списка слева"
                />
            </Card>
        );
    }

    return (
        <Card title="Детали задания">
            <JobMeta job={job} />
            <UrlChecksTable checks={job.urlChecks} />
        </Card>
    );
};
