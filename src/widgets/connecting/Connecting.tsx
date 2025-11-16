import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/store/hooks';
import { useCreateUserTransactionMutation } from 'features/userTransaction/api/userCrudTransactionApi';
import {
    selectList,
    selectTotalAmountRub,
} from 'features/userTransaction/model/userTransactionSlice';
import { Button, Flex } from 'shared/ui';
import { ConnectingModal } from 'widgets/connecting/modal/ConnectingModal';
import { useSetReserveSettingsMutation } from 'widgets/connecting/model/api/reserveApi';
import { MandatoryPaymentsTable } from 'widgets/connecting/paymentsTable/MandatoryPaymentsTable';

import styles from './Connecting.module.scss';

export const Connecting = () => {
    const navigate = useNavigate();

    const totalAmountRub = useAppSelector(selectTotalAmountRub);
    useAppSelector(selectList);

    const [createUserTransaction] = useCreateUserTransactionMutation();
    const [setReserveSettings, { isSuccess }] = useSetReserveSettingsMutation();

    const [isAddOpen, setIsAddOpen] = useState(false);

    const formattedTotal = useMemo(
        () =>
            (totalAmountRub ?? 0)
                .toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
                .replace(',', '.'),
        [totalAmountRub]
    );

    const handleActivateClick = () => {
        setReserveSettings({ percentOfSalary: 40 });
    };

    const handleAddClick = () => {
        setIsAddOpen(true);
    };

    const handleAddCancel = () => {
        setIsAddOpen(false);
    };

    const handleAddSubmit = (data: {
        category: string;
        amountRub: number;
        day: number;
        countNumber: number;
    }) => {
        const payload = {
            category: data.category,
            amountRub: data.amountRub,
            day: data.day,
            countNumber: data.countNumber,
        };

        createUserTransaction(payload);

        setIsAddOpen(false);
    };

    useEffect(() => {
        navigate('/cabinet');
    }, [isSuccess]);

    return (
        <Flex
            dir='column'
            className={styles.wrapper}
            justify='center'
            align='center'
            gap={45}
            style={{ width: '900px' }}
        >
            <MandatoryPaymentsTable />

            <Flex
                gap={25}
                align='center'
                style={{ width: '100%' }}
                justify='space-between'
            >
                <Button
                    label='+'
                    color='green'
                    className={styles.actBtn}
                    onClick={handleAddClick}
                    style={{ width: '70px', fontSize: '40px' }}
                />

                <Flex
                    className={styles.totalPill}
                    aria-label='Итог по всем платежам'
                >
                    <span className={styles.totalLabel}>Итог:</span>
                    <span className={styles.totalValue}>
                        {formattedTotal} ₽
                    </span>
                </Flex>
            </Flex>

            <Flex
                dir='column'
                gap={15}
                align='center'
                style={{ width: '100%' }}
            >
                <Button
                    label='Активировать'
                    color='green'
                    className={styles.actBtn}
                    onClick={handleActivateClick}
                    size='full'
                />
                <span>0 ₽ / 3 месяца</span>
            </Flex>

            <ConnectingModal
                isOpen={isAddOpen}
                onClose={handleAddCancel}
                // @ts-ignore
                onSubmit={handleAddSubmit}
            />
        </Flex>
    );
};
