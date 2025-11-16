import { useMemo, useState } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { useDeleteUserTransactionBackendMutation } from 'features/userTransaction/api/userCrudTransactionApi';
import {
    Payment,
    selectList,
} from 'features/userTransaction/model/userTransactionSlice';
import trash from 'shared/img/trash.png';
import { Button, Flex } from 'shared/ui';
import { SummSell } from 'widgets/connecting/paymentsTable/SummSell';

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

export const MandatoryPaymentsTable = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectList);
    const [expanded, setExpanded] = useState(false);

    const viewData = useMemo(
        () => (expanded ? data : data.slice(0, 5)),
        [data, expanded]
    );

    const [deleteUserTransaction] = useDeleteUserTransactionBackendMutation();

    const columns = useMemo<ColumnDef<Payment>[]>(
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
                // @ts-ignore
                cell: SummSell,
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
                        <Flex
                            key={r.id}
                            gap={15}
                            justify='center'
                            align='center'
                        >
                            <div className={s.tr}>
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
                                onClick={() =>
                                    deleteUserTransaction(r.original.id)
                                }
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
                </div>
            </div>
        </div>
    );
};
