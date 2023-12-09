"use client";
import React from "react";
import StyledButton from "../ui/styledButton";
import { useCollapse } from "react-collapsed";
import { Input } from "../ui/input";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    getExpandedRowModel,
    ExpandedState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    renderExpandedComponent?: (props?: any) => JSX.Element;
}

type PaginationState = {
    pageIndex: number;
    pageSize: number;
};

const defaultPagination: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
};

export function TableLogicWOHeaders<TData, TValue>({
    columns,
    data,
    renderExpandedComponent,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [filtering, setFiltering] = React.useState("");
    const [expanded, setExpanded] = React.useState<ExpandedState>({});
    const [inputValue, setInputValue] = React.useState("");


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        initialState: {
            pagination: defaultPagination,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        state: {
            sorting,
            globalFilter: filtering,
            columnFilters,
            columnVisibility,
            expanded,
        },
        onGlobalFilterChange: setFiltering,
    });

    const inputRef = React.useRef(null);

    const handlePageSizeChange = () => {
        const pageSize = Number(inputValue);
        if (!isNaN(pageSize) && pageSize >0) {
            table.setPageSize(pageSize);
        } else if(pageSize===0){
            alert("Page size can not be zero")
        }
            else {
            alert("Please enter a valid number");
        }
    };

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} style={{fontWeight: 'bold'}}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
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
                            table.getRowModel().rows.map((row: any) => {
                                const rowElements = [];

                                rowElements.push(
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected()
                                                ? "selected"
                                                : undefined
                                        }
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell: any) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                );
                                if (row.getIsExpanded()) {
                                    rowElements.push(
                                        <TableRow key={`extra ${row.id}`}>
                                            <TableCell colSpan={columns.length}>
                                                {renderExpandedComponent
                                                    ? renderExpandedComponent()
                                                    : null}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                                return rowElements;
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-start space-x-2 py-4">
                <StyledButton
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Prev
                </StyledButton>
                <StyledButton
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </StyledButton>
                <div>
                 <button
                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 r-100 capitalize"
                    onClick={handlePageSizeChange}
                    disabled={!table.getCanNextPage()}
                >
                    Set Page Size
                </button>
                <input
                    className="border border-gray-300 w-20 m-0 py-2 px-3 font-sm shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    type="text"
                    value={inputValue}
                    onKeyDown={(e) => (e.key === "Enter" ? handlePageSizeChange() : null)}
                    onChange={(e) => setInputValue(e.target.value)}
                    ref={inputRef}
                />
                </div>
            </div>
        </div>
    );
}
