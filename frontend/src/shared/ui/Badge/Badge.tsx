import { Badge as MantineBadge, type BadgeProps as MantineBadgeProps } from '@mantine/core';
import type { FC, ReactNode } from 'react';

interface BadgeProps extends MantineBadgeProps {
    children: ReactNode;
}

export const Badge: FC<BadgeProps> = ({ children, ...props }) => {
    return <MantineBadge {...props}>{children}</MantineBadge>;
};
