"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
    SortingState,
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
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Country } from "./columns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
        undefined
    );
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 25,
            },
        },
    });

    return (
        <div className="mx-auto flex max-w-screen-2xl flex-col justify-between">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filter country name..."
                    value={
                        (table.getColumn("name")?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Dialog>
                    {selectedCountry && (
                        <DialogContent className="max-w-[640px]">
                            <DialogHeader>
                                <DialogTitle>Country Detail</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-row items-center justify-between">
                                <span className="font-light">Flag</span>
                                <Avatar>
                                    <AvatarImage src={selectedCountry.flags} />
                                    <AvatarFallback>
                                        {selectedCountry.cca2}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span className="font-light">Name</span>
                                <span>{selectedCountry.name}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span className="font-light">CCA2</span>
                                <span>{selectedCountry.cca2}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span className="font-light">CCA3</span>
                                <span>{selectedCountry.cca3}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span className="font-light">Native Name</span>
                                <span>{selectedCountry.nativeName}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-3">
                                <span className="font-light">
                                    Alternative Name
                                </span>
                                <span>{selectedCountry.altSpellings}</span>
                            </div>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogContent>
                    )}
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
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                        onClick={() => {
                                            setSelectedCountry(
                                                row.original as Country
                                            );
                                        }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
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
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Dialog>
            </div>
        </div>
    );
}
