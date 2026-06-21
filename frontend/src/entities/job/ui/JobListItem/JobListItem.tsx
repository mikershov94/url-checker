import type { FC } from 'react';
import { Button } from '@shared';
import { type JobInfo } from '../../model/job-info';
import { JobStatusBadge } from '../JobStatusBadge/JobStatusBadge';
import { JobStatistics } from '../JobStatistics/JobStatistics';

import styles from './JobListItem.module.scss';

interface JobListItemProps {
    job: JobInfo;
    isSelected?: boolean;
    onSelect: (jobId: string) => void;
    onCancel: (jobId: string) => void;
}

export const JobListItem: FC<JobListItemProps> = ({
    job,
    isSelected = false,
    onSelect,
    onCancel,
}) => {
    return (
        <div className={isSelected ? styles.selected : styles.root}>
            <div className={styles.header}>
                <button type="button" className={styles.idButton} onClick={() => onSelect(job.id)}>
                    {job.id}
                </button>

                <JobStatusBadge status={job.status} />
            </div>

            <JobStatistics
                urlCount={job.urlCount}
                successCount={job.successCount}
                errorCount={job.errorCount}
            />

            <div className={styles.actions}>
                <Button variant="light" size="xs" onClick={() => onSelect(job.id)}>
                    Открыть
                </Button>

                <Button color="red" variant="subtle" size="xs" onClick={() => onCancel(job.id)}>
                    Отменить
                </Button>
            </div>
        </div>
    );
};
