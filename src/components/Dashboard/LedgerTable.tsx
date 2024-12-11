import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { LedgerEntry } from '../../types/ledger';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<LedgerEntry>();

const columns = [
  columnHelper.accessor('date', {
    header: 'Date',
    cell: info => format(new Date(info.getValue()), 'dd/MM/yyyy')
  }),
  columnHelper.accessor('name', {
    header: 'Customer Name'
  }),
  columnHelper.accessor('rent', {
    header: 'Rent Amount',
    cell: info => `₹${info.getValue().toLocaleString()}`
  }),
  columnHelper.accessor('totals.advanceReceived', {
    header: 'Advance',
    cell: info => `₹${info.getValue().toLocaleString()}`
  }),
  columnHelper.accessor('totals.balanceCollected', {
    header: 'Balance',
    cell: info => `₹${info.getValue().toLocaleString()}`
  }),
  columnHelper.accessor('totals.pendingBalance', {
    header: 'Pending',
    cell: info => `₹${info.getValue().toLocaleString()}`
  })
];

interface LedgerTableProps {
  data: LedgerEntry[];
}

export function LedgerTable({ data }: LedgerTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}