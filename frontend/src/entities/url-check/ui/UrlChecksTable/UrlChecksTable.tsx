import { Table, EmptyState } from '@shared';
import type { UrlCheck } from '../../model/url-check';
import { UrlCheckStatusBadge } from '../UrlCheckStatusBadge/UrlCheckStatusBadge';

interface Props {
    checks: UrlCheck[];
}

export const UrlChecksTable = ({ checks }: Props) => {
    if (checks.length === 0) {
        return <EmptyState title="URL-проверок нет" />;
    }

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>URL</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>HTTP</Table.Th>
                    <Table.Th>Duration</Table.Th>
                    <Table.Th>Error</Table.Th>
                </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
                {checks.map((check) => (
                    <Table.Tr key={check.url}>
                        <Table.Td>{check.url}</Table.Td>
                        <Table.Td>
                            <UrlCheckStatusBadge status={check.status} />
                        </Table.Td>
                        <Table.Td>{check.httpCode ?? '-'}</Table.Td>
                        <Table.Td>
                            {typeof check.duration === 'number' ? `${check.duration} ms` : '-'}
                        </Table.Td>
                        <Table.Td>{check.errorMessage ?? '-'}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
};
