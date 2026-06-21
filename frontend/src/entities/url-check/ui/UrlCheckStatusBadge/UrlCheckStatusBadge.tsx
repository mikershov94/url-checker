import { Badge } from '@shared';
import { UrlCheckStatus } from '../../model/url-check-status';
import type { FC } from 'react';

interface UrlCheckStatusBadgeProps {
    status: UrlCheckStatus;
}

const statusColorMap: Record<UrlCheckStatus, string> = {
    [UrlCheckStatus.pending]: 'yellow',
    [UrlCheckStatus.inProgress]: 'blue',
    [UrlCheckStatus.success]: 'green',
    [UrlCheckStatus.error]: 'red',
    [UrlCheckStatus.cancelled]: 'gray',
};

export const UrlCheckStatusBadge: FC<UrlCheckStatusBadgeProps> = ({ status }) => {
    return (
        <Badge color={statusColorMap[status]} variant="light">
            {status}
        </Badge>
    );
};
