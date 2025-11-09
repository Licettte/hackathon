// MandatoryPaymentsTable.tsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';

import { useAppSelector } from 'app/store/hooks';
import { selectList } from 'features/userTransaction/model/userTransactionSlice';
import { userTransaction } from 'features/userTransaction/types';
import trash from 'shared/img/trash.png';
import { Button, Flex, Input } from 'shared/ui';

import s from './MandatoryPaymentsTable.module.scss';

const categoryBadge: Record<string, string> = {
    ЖКХ: s.badgeBlue,
    Кредит: s.badgePurple,
    Аренда: s.badgeGreen,
    Налоги: s.badgeOrange,
    Страховка: s.badgeTeal,
};

const statusBadge: Record<string, string> = {
    Оплачен: s.stOk,
    Ожидает: s.stInfo,
    Просрочен: s.stWarn,
};

const fmtRub = (n: number) =>
    `${n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const MandatoryPaymentsTable = () => {
    //[start]=useMu
    const navigate = useNavigate();

    const data = useAppSelector(selectList);
    const [expanded, setExpanded] = useState(false);

    const viewData = useMemo(
        () => (expanded ? data : data.slice(0, 5)),
        [data, expanded]
    );

    const totalAll = useMemo(
        () => data.reduce((acc, x) => acc + (Number(x.amountRub) || 0), 0),
        [data]
    );

    const onClick = () => {
        navigate('/cabinet');

        // start(); //todo данные, которые отредактровал пользователь из стора взять
    };

    const columns = useMemo<ColumnDef<Required<userTransaction>>[]>(
        () => [
            {
                header: 'Платёж',
                accessorKey: 'category',
                cell: ({ row }) => (
                    <div className={s.cellLeft}>
                        <span
                            className={clsx(
                                s.catBadge,
                                categoryBadge[row.original.category] ??
                                    s.badgeCyan
                            )}
                        >
                            {row.original.category}
                        </span>
                    </div>
                ),
            },
            {
                header: 'Сумма',
                accessorKey: 'amountRub',
                cell: ({ getValue }) => (
                    <span className={s.num}>
                        <Input value={fmtRub(Number(getValue()))} size='sm' />
                        {/*todo вынсти в отдельный сell. менять значение в инпуте , сделать перерасчет итоговой суммы*/}
                    </span>
                ),
            },
            {
                header: 'Дата',
                accessorKey: 'day',
                cell: ({ getValue }) => (
                    <span className={s.day}>{getValue<number>()}</span>
                ),
            },
            {
                header: 'Статус',
                accessorKey: 'status',
                cell: ({ getValue }) => {
                    const v = getValue<string>();
                    return (
                        <span
                            className={clsx(
                                s.statusBadge,
                                statusBadge[v] ?? s.stInfo
                            )}
                        >
                            {v}
                        </span>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: viewData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const hasMore = data.length > 5;

    return (
        <div className={s.card}>
            <header className={s.titleWrap}>
                <h2 className={s.title}>Ваши обязательные платежи</h2>
            </header>

            <div className={s.wrap}>
                <div className={s.head}>
                    {table.getHeaderGroups().map((hg) =>
                        hg.headers.map((h) => (
                            <div key={h.id} className={s.th}>
                                {flexRender(
                                    h.column.columnDef.header,
                                    h.getContext()
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className={s.body}>
                    {table.getRowModel().rows.map((r) => (
                        <Flex gap={15} justify='center' align='center'>
                            <div key={r.id} className={s.tr}>
                                {r.getVisibleCells().map((c) => (
                                    <div key={c.id} className={s.td}>
                                        {flexRender(
                                            c.column.columnDef.cell,
                                            c.getContext()
                                        )}
                                    </div>
                                ))}
                            </div>

                            <img
                                src={trash}
                                alt='удалить'
                                className={s.trash}
                            />
                        </Flex>
                    ))}
                </div>
                <div className={s.footer}>
                    {hasMore && (
                        <Button
                            label={expanded ? 'Свернуть' : 'Подробнее'}
                            onClick={() => setExpanded((v) => !v)}
                            color='black'
                            className={s.moreBtn}
                        />
                    )}

                    <div
                        className={s.totalPill}
                        aria-label='Итог по всем платежам'
                    >
                        <span className={s.totalLabel}>Итог:</span>
                        <span className={s.totalValue}>{fmtRub(totalAll)}</span>
                    </div>
                </div>
                <Flex dir='column' gap={15} align='center'>
                    <Button
                        label='Активировать'
                        color='green'
                        className={s.actBtn}
                        onClick={onClick}
                    />
                    <span> 0 ₽ / 3 месяца </span>
                </Flex>
            </div>
        </div>
    );
};
