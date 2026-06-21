import { Badge } from '@shared';
import { UrlCheckStatus } from '../../model/url-check-status';

interface Props {
    status: UrlCheckStatus;
}

const statusColorMap: Record<UrlCheckStatus, string> = {
    [UrlCheckStatus.pending]: 'yellow',
    [UrlCheckStatus.inProgress]: 'blue',
    [UrlCheckStatus.success]: 'green',
    [UrlCheckStatus.error]: 'red',
    [UrlCheckStatus.cancelled]: 'gray',
};

export const UrlCheckStatusBadge = ({ status }: Props) => {
    return (
        <Badge color={statusColorMap[status]} variant="light">
            {status}
        </Badge>
    );
};
