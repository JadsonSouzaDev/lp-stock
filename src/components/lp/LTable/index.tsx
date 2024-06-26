"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  VisibilityState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EmptyState, { EmptyStateProps } from "./components/EmptyState";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";
import ShowColumns from "./components/ShowColumns";
import { TableFilter } from "./type";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters: TableFilter[];
  emptyProps: EmptyStateProps;
  visibility: VisibilityState;
  loading?: boolean;
}

function LTable<TData, TValue>({
  columns,
  data,
  filters,
  emptyProps,
  visibility,
  loading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(visibility);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  if (data.length === 0) {
    return <EmptyState {...emptyProps} />;
  }

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex justify-between gap-2 w-full">
        {filters.map((filter) => (
          <div
            key={filter.accessorKey}
            className="grid w-full max-w-sm items-center gap-1.5"
          >
            <Label className="w-full text-start" htmlFor={filter.accessorKey}>
              {filter.label}
            </Label>
            <Input
              className="max-w-sm"
              placeholder={filter.placeholder}
              value={
                (table
                  .getColumn(filter.accessorKey)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(filter.accessorKey)
                  ?.setFilterValue(event.target.value)
              }
            />
          </div>
        ))}
        {!!emptyProps.onCreate && (
          <Button
            variant="secondary"
            onClick={() =>
              !!emptyProps.onCreate ? emptyProps.onCreate() : null
            }
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo
          </Button>
        )}
      </div>
      <ShowColumns columns={table.getAllColumns()} />

      <div className="rounded-md w-full border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {loading && (
            <Loading columns={table.getHeaderGroups()[0].headers.length} />
          )}
          {!loading && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-left">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
                    <EmptyState {...emptyProps} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {!loading && (
        <div className="flex w-full items-center justify-end space-x-2">
          <Pagination
            total={data.length}
            canNextPage={table.getCanNextPage()}
            canPreviousPage={table.getCanPreviousPage()}
            nextPage={table.nextPage}
            previousPage={table.previousPage}
          />
        </div>
      )}
    </div>
  );
}

export default LTable;
