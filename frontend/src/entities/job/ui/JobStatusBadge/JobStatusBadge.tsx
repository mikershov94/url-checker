import { Badge } from '@shared';
import { JobStatus } from '../../model/job-status';

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

export const JobStatusBadge = ({ status }: JobStatusBadgeProps) => {
    return (
        <Badge color={statusColorMap[status]} variant="light">
            {status}
        </Badge>
    );
};
