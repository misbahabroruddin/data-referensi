"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/react-pagination";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  pageCount: number;
  pagination: React.ComponentState;
  setPagination: React.ComponentState;
  total: number;
  isLoading?: boolean;
}

interface PageChangeEvent {
  selected: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  setPagination,
  total,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: total,
    pageCount: pageCount || 0,
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
    },
  });

  const handlePageChange = (e: PageChangeEvent) => {
    table.setPageIndex(e.selected);
    setPagination(e.selected);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={`${header.id}-${index}`}
                      className={cn(
                        "bg-blue-05 text-white last:!w-36",
                        index === 0 && "rounded-tl-lg",
                        index === headerGroup.headers.length - 1 &&
                          "rounded-tr-lg",
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: columns.length }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((item, index) => (
                    <TableCell
                      key={`${item.id}-${index + 1}`}
                      className="p-3 text-center"
                    >
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={`${row.id}-${index}`}
                  data-state={row.getIsSelected() && "selected"}
                  className="even:bg-sky-02"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={`${index + "a"}`} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2 flex items-center justify-between">
        {data?.data?.length ? (
          <>
            <div className="flex gap-2 text-primary">
              <p>Data</p>
              <p>{data?.to || 1}</p>
              <p>of</p>
              <p>{total}</p>
            </div>
            {pageCount > 1 && (
              <Pagination
                pageCount={pageCount}
                pageOffset={pagination.pageIndex}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : null}
      </div>
    </>
  );
}
