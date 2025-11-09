import { FC } from 'react';

import { Connecting } from 'widgets/connecting/Connecting';

import styles from './ConnectionPage.module.scss';

type ConnectionPageProps = {};

export const ConnectionPage: FC<ConnectionPageProps> = ({}) => {
    return <Connecting />;
};
