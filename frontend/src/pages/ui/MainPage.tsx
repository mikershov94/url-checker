import { type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@app/store';

import { JobList } from '@widgets/JobList';
import { JobDetailsPanel } from '@widgets/JobDetailsPanel';
import { selectJob, useGetJobsQuery } from '@entities/job';
import { CreateJobForm } from '@features/create-job';

import styles from './MainPage.module.scss';

export const MainPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const selectedJobId = useSelector((state: RootState) => state.jobs.selectedJobId);

    const { data: jobs = [], isLoading } = useGetJobsQuery();

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.stack}>
                    <CreateJobForm />
                    <JobList
                        jobs={jobs}
                        selectedJobId={selectedJobId ?? undefined}
                        isLoading={isLoading}
                        onSelectJob={(jobId) => dispatch(selectJob(jobId))}
                        onCancelJob={(jobId) => console.log('cancel', jobId)}
                    />
                </div>
            </div>
            <div className={styles.column}>
                <JobDetailsPanel />
            </div>
        </div>
    );
};
