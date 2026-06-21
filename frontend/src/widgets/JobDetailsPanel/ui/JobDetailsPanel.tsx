import { UrlChecksTable } from '@entities/url-check';
import { JobMeta, type JobDetails } from '@entities/job';
import { Card, EmptyState, Loader } from '@shared';

interface Props {
    job?: JobDetails;
    isLoading?: boolean;
}

export const JobDetailsPanel = ({ job, isLoading = false }: Props) => {
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
