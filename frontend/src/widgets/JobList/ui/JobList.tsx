import { JobListItem, type JobInfo } from '@entities/job';
import { Card, EmptyState, Loader } from '@shared';

import styles from './JobList.module.scss';

interface JobsListProps {
    jobs: JobInfo[];
    selectedJobId?: string;
    isLoading?: boolean;
    onSelectJob: (jobId: string) => void;
    onCancelJob: (jobId: string) => void;
}

export const JobList = ({
    jobs,
    selectedJobId,
    isLoading = false,
    onSelectJob,
    onCancelJob,
}: JobsListProps) => {
    if (isLoading) {
        return (
            <Card title="Задания">
                <Loader />
            </Card>
        );
    }

    if (jobs.length === 0) {
        return (
            <Card title="Задания">
                <EmptyState title="Заданий пока нет" description="Создайте первую проверку URL" />
            </Card>
        );
    }

    return (
        <Card title="Задания">
            <div className={styles.list}>
                {jobs.map((job) => (
                    <JobListItem
                        key={job.id}
                        job={job}
                        isSelected={job.id === selectedJobId}
                        onSelect={onSelectJob}
                        onCancel={onCancelJob}
                    />
                ))}
            </div>
        </Card>
    );
};
