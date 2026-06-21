import type { FC } from 'react';
import { JobStatusBadge } from '@entities/job';
import type { JobDetails } from '../../model/types/job-details';

import styles from './JobMeta.module.scss';

interface JobMetaProps {
    job: JobDetails;
}

export const JobMeta: FC<JobMetaProps> = ({ job }) => {
    return (
        <div className={styles.root}>
            <div>
                <span className={styles.label}>ID:</span>
                <span>{job.id}</span>
            </div>

            <div>
                <span className={styles.label}>Статус:</span>
                <JobStatusBadge status={job.status} />
            </div>

            <div>
                <span className={styles.label}>Создано:</span>
                <span>{job.createdAt}</span>
            </div>

            <div>
                <span className={styles.label}>Обновлено:</span>
                <span>{job.updatedAt}</span>
            </div>
        </div>
    );
};
