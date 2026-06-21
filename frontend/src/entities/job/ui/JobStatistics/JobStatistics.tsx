import type { FC } from 'react';
import styles from './JobStatistics.module.scss';

interface JobStatisticsProps {
    urlCount: number;
    successCount: number;
    errorCount: number;
}

export const JobStatistics: FC<JobStatisticsProps> = ({ urlCount, successCount, errorCount }) => {
    return (
        <div className={styles.root}>
            <span>URL: {urlCount}</span>
            <span>Успешных: {successCount}</span>
            <span>Ошибок: {errorCount}</span>
        </div>
    );
};
