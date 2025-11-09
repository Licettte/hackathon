import { useMemo } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';

import s from './PaymentsTable.module.scss';

type Category = 'ЖКХ' | 'Кредит' | 'Аренда' | 'Налоги' | 'Страховка';

type Status = 'Оплачен' | 'Ожидает' | 'Просрочен';

export type Payment = {
    id: string;
    category: Category;
    amountRub: number;
    day: number;
    status: Status;
};

const MOCK_PAYMENTS: Payment[] = [
    {
        id: '1',
        category: 'ЖКХ',
        amountRub: 3615.32,
        day: 5,
        status: 'Оплачен',
    },
    {
        id: '2',
        category: 'Кредит',
        amountRub: 3617.12,
        day: 12,
        status: 'Ожидает',
    },
    {
        id: '3',
        category: 'Аренда',
        amountRub: 36190.0,
        day: 1,
        status: 'Оплачен',
    },
    {
        id: '4',
        category: 'Налоги',
        amountRub: 2620.0,
        day: 25,
        status: 'Просрочен',
    },
];

const categoryBadge: Record<Category, string> = {
    ЖКХ: s.badgeBlue,
    Кредит: s.badgePurple,
    Аренда: s.badgeGreen,
    Налоги: s.badgeOrange,
    Страховка: s.badgeTeal,
};

const statusBadge: Record<Status, string> = {
    Оплачен: s.stOk,
    Ожидает: s.stInfo,
    Просрочен: s.stWarn,
};

export const PaymentsTable = () => {
    const data = useMemo(() => MOCK_PAYMENTS, []);

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
                                categoryBadge[row.original.category]
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
                        {Number(getValue<number>()).toLocaleString('ru-RU', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        ₽
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
                cell: ({ getValue }) => (
                    <span
                        className={clsx(
                            s.statusBadge,
                            statusBadge[getValue<Status>()]
                        )}
                    >
                        {getValue<string>()}
                    </span>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
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
                ))}
            </div>
        </div>
    );
};
