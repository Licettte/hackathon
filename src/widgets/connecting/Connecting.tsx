import { FC } from 'react';

import { Flex } from 'shared/ui';
import { MandatoryPaymentsTable } from 'widgets/connecting/paymentsTable/MandatoryPaymentsTable';

import styles from './Connecting.module.scss';

type ConnectingProps = {};

export const Connecting: FC<ConnectingProps> = ({}) => {
    return (
        <Flex
            dir='column'
            className={styles.wrapper}
            justify='center'
            align='center'
        >
            <MandatoryPaymentsTable />

            {/*<span> Вы можете поменять приоритет</span>*/}
            {/*<span> Итог </span>*/}
        </Flex>
    );
};
