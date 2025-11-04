import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import s from "./Table.module.scss";

type Obligation = {
    id: string;
    name: string;     // ЖКХ, Кредит …
    amount: number;   // в рублях
    dueDay: number;   // день месяца
};

const RUB = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });

const sampleData: Obligation[] = [
  { id: "1", name: "ЖКХ",    amount: 5000, dueDay: 5  },
  { id: "2", name: "Кредит", amount: 8000, dueDay: 15 },
];

export function ObligationsTable({ data = sampleData }: { data?: Obligation[] }) {
  const columns = useMemo<ColumnDef<Obligation>[]>(
    () => [
      { header: "Платёж", accessorKey: "name" },
      {
        header: "Сумма",
        accessorKey: "amount",
        cell: (ctx) => RUB.format(ctx.getValue<number>()),
      },
      {
        header: "День списания",
        accessorKey: "dueDay",
        cell: (ctx) => `${ctx.getValue<number>()} число`,
      },
    ],
    []
  );

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  const total = data.reduce((acc, x) => acc + x.amount, 0);

  return (
    <div className={s.wrap}>
      <table className={s.table}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th key={h.id}>
                  {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className={s.totalLabel} colSpan={1}>ИТОГ</td>
            <td className={s.totalValue}>{RUB.format(total)}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
