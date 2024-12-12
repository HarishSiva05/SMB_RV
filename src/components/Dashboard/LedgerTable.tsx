import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';

interface LedgerEntry {
  id: string;
  date: string;
  name: string;
  rent: number;
  gst_bill_amt: number;
  cleaning: number;
  electricity: number;
  water: number;
  gas: number;
  ac: number;
  room_rent: number;
  generator: number;
  prev_day: number;
  others: number;
  discount: number;
  gst_amt: number;
}

const columnHelper = createColumnHelper<LedgerEntry>();

const columns = [
  columnHelper.accessor('date', {
    header: 'Date',
    cell: info => format(new Date(info.getValue()), 'dd/MM/yyyy')
  }),
  columnHelper.accessor('name', {
    header: 'Name'
  }),
  columnHelper.accessor('rent', {
    header: 'Rent',
    cell: info => `₹${info.getValue().toLocaleString()}`
  }),
  columnHelper.accessor('gst_bill_amt', {
    header: 'GST Bill',
    cell: info => `₹${info.getValue().toLocaleString()}`
  }),
  columnHelper.accessor(row => {
    const total = row.rent + row.gst_bill_amt + row.cleaning + 
                 row.electricity + row.water + row.gas + 
                 row.ac + row.room_rent + row.generator + 
                 row.prev_day + row.others - row.discount;
    return total;
  }, {
    id: 'total',
    header: 'Total',
    cell: info => `₹${info.getValue().toLocaleString()}`
  })
];

interface LedgerTableProps {
  data: LedgerEntry[];
}

export const LedgerTable: React.FC<LedgerTableProps> = ({ data }) => {
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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
};