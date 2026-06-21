import type { FC } from 'react';
import { Badge } from '@shared';
import { JobStatus } from '../../model/types/job-status';

interface JobStatusBadgeProps {
    status: JobStatus;
}

const statusColorMap: Record<JobStatus, string> = {
    [JobStatus.pending]: 'yellow',
    [JobStatus.inProgress]: 'blue',
    [JobStatus.completed]: 'green',
    [JobStatus.cancelled]: 'gray',
    [JobStatus.failed]: 'red',
};

export const JobStatusBadge: FC<JobStatusBadgeProps> = ({ status }) => {
    return (
        <Badge color={statusColorMap[status]} variant="light">
            {status}
        </Badge>
    );
};
