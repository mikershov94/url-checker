import styles from './JobStatistics.module.scss';

interface JobStatisticsProps {
    urlCount: number;
    successCount: number;
    errorCount: number;
}

export const JobStatistics = ({ urlCount, successCount, errorCount }: JobStatisticsProps) => {
    return (
        <div className={styles.root}>
            <span>URL: {urlCount}</span>
            <span>OK: {successCount}</span>
            <span>ERR: {errorCount}</span>
        </div>
    );
};
