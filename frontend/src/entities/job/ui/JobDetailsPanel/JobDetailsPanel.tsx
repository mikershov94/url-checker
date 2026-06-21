import type { RootState } from '@app/store';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { UrlChecksTable } from '@entities/url-check';
import { apiErrors, Card, EmptyState, ErrorMessage, Loader } from '@shared';
import { useGetJobDetailsQuery } from '../../api';
import { JobMeta } from '../JobMeta/JobMeta';

export const JobDetailsPanel: FC = () => {
    const selectedJobId = useSelector((state: RootState) => state.jobs.selectedJobId);

    const {
        data: job,
        isLoading,
        error,
    } = useGetJobDetailsQuery(selectedJobId ?? '', {
        skip: !selectedJobId,
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
