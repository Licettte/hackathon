import { FC, useState } from 'react';

import { useAppSelector } from 'app/store/hooks';
import { selectList } from 'features/userTransaction/model/userTransactionSlice';
import { Button, Flex } from 'shared/ui';

import styles from './ReserveAccount.module.scss';

type ReserveAccountProps = {};

export const ReserveAccount: FC<ReserveAccountProps> = () => {
    const [balance] = useState(0);
    const data = useAppSelector(selectList);

    const badgeClass = (c: string) =>
        c === 'ЖКХ'
            ? styles.badgeBlue
            : c === 'Кредит'
              ? styles.badgePurple
              : c === 'Аренда'
                ? styles.badgeGreen
                : c === 'Налоги'
                  ? styles.badgeOrange
                  : c === 'Страховка'
                    ? styles.badgeTeal
                    : styles.badgeCyan;

    const statusClass = (s: string) =>
        s === 'Оплачен'
            ? styles.stOk
            : s === 'Просрочен'
              ? styles.stWarn
              : styles.stInfo;

    return (
        <section className={styles.wrap}>
            <Flex dir='column' className={styles.card} justify='space-between'>
                <div className={styles.cardHead}>
                    <h4 className={styles.cardTitle}>Сберегательный счёт</h4>
                </div>

                <div className={styles.balanceBox}>
                    <div className={styles.balanceLabel}>Баланс</div>
                    <div className={styles.balanceValue}>{balance}</div>
                    <div className={styles.balanceHint}>
                        Счёт для обязательных платежей
                    </div>
                </div>

                <Button
                    label='История транзакций'
                    color='green'
                    size='sm'
                    className={styles.blockBtn}
                />
            </Flex>

            <div className={styles.card}>
                <div className={styles.cardHead}>
                    <h4 className={styles.cardTitle}>Ближайшие платежи</h4>
                </div>

                <div className={styles.listHeader}>
                    <span className={styles.colCategory}>Категория</span>
                    <span className={styles.colDay}>День</span>
                    <span className={styles.colStatus}>Статус</span>
                </div>

                <div className={styles.list}>
                    {data.map((p) => (
                        <div className={styles.row} key={p.id}>
                            <span
                                className={`${styles.badge} ${badgeClass(p.category)}`}
                            >
                                {p.category}
                            </span>

                            <span className={styles.day} title='День списания'>
                                {p.day}
                            </span>

                            <span
                                className={`${styles.status} ${statusClass(p.status)}`}
                            >
                                {p.status}
                            </span>
                        </div>
                    ))}
                </div>

                <Button
                    label='Редактировать'
                    color='green'
                    size='sm'
                    className={styles.blockBtn}
                />
            </div>
        </section>
    );
};
