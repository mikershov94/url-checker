import type { FC } from 'react';
import { JobStatusBadge } from '@entities/job';
import type { JobDetails } from '../../model/job-details';

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
                <span className={styles.label}>Status:</span>
                <JobStatusBadge status={job.status} />
            </div>

            <div>
                <span className={styles.label}>Created:</span>
                <span>{job.createdAt}</span>
            </div>

            <div>
                <span className={styles.label}>Updated:</span>
                <span>{job.updatedAt}</span>
            </div>
        </div>
    );
};
