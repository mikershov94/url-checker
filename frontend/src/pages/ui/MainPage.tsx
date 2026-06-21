import type { FC } from 'react';
import { JobList } from '@widgets/JobList';
import { CreateJobForm } from '@features/create-job';
import { Card } from '@shared';

import styles from './MainPage.module.scss';

export const MainPage: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.stack}>
                    <CreateJobForm />
                    <JobList
                        jobs={[]}
                        selectedJobId={''}
                        onSelectJob={() => {}}
                        onCancelJob={(jobId) => console.log('cancel', jobId)}
                    />
                </div>
            </div>
            <div className={styles.column}>
                <Card className={styles.details} title="Детали задания">
                    Hello
                </Card>
            </div>
        </div>
    );
};
