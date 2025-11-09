import { FC, useState } from 'react';

import { Button, Flex } from 'shared/ui';

import styles from './ReserveAccount.module.scss';

type ReserveAccountProps = {};

const fmtRub = (n: number) =>
    n.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export const ReserveAccount: FC<ReserveAccountProps> = () => {
    const [balance] = useState(0);

    const upcoming = [
        { id: '1', category: 'ЖКХ', amount: 5000, day: 5, status: 'Оплачен' },
        {
            id: '2',
            category: 'Кредит',
            amount: 7000,
            day: 9,
            status: 'Ожидает',
        },
        { id: '3', category: 'Связь', amount: 790, day: 12, status: 'Ожидает' },
    ];

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
            {/* Левая колонка — счёт */}
            <Flex dir='column' className={styles.card}>
                <div className={styles.cardHead}>
                    <h4 className={styles.cardTitle}>Сберегательный счёт</h4>
                </div>

                <div className={styles.balanceBox}>
                    <div className={styles.balanceLabel}>Баланс</div>
                    <div className={styles.balanceValue}>{fmtRub(balance)}</div>
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

                <div className={styles.list}>
                    {upcoming.map((p) => (
                        <div className={styles.row} key={p.id}>
                            <span
                                className={`${styles.badge} ${badgeClass(p.category)}`}
                            >
                                {p.category}
                            </span>

                            <span className={styles.amount}>
                                {fmtRub(p.amount)}
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
                    label='Подробнее'
                    color='green'
                    size='sm'
                    className={styles.blockBtn}
                />
            </div>
        </section>
    );
};
