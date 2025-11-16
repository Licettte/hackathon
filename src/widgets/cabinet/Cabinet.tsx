import { FC } from 'react';

import { useAppSelector } from 'app/store/hooks';
import { ReserveAccount } from 'entities/reserveAccount/ReserveAccount';
import { selectList } from 'features/userTransaction/model/userTransactionSlice';
import img from 'shared/img/steps.png';
import { Flex } from 'shared/ui';
import { MandatoryPaymentsTable } from 'widgets/connecting/paymentsTable/MandatoryPaymentsTable';

import styles from './Cabinet.module.scss';

type CabinetProps = {};

export const Cabinet: FC<CabinetProps> = ({}) => {
    return (
        <Flex
            dir='column'
            className={styles.wrapper}
            justify='center'
            align='center'
        >
            <ReserveAccount />
        </Flex>
    );
};
