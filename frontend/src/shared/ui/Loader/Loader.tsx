import type { FC } from 'react';
import { Center, Loader as MantineLoader } from '@mantine/core';

export const Loader: FC = () => {
    return (
        <Center p="lg">
            <MantineLoader />
        </Center>
    );
};
