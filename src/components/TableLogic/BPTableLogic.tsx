"use client";
import React from "react";
import StyledButton from "../ui/styledButton";
import { useCollapse } from "react-collapsed";
import { Input } from "../ui/input";

import { columnBT } from "../BladeTask/BTC";
import { GET_ALL_BT } from "../../api/queryList";

import {
    ColumnDef,
    ColumnFiltersState,
    Pagination,
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
import { TableLogic } from "./TableLogic";
import { TableLogicWOHeaders } from "./TableLogicWOHeader";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

type PaginationState = {
    pageIndex: number;
    pageSize: number;
};

const defaultPagination: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
};

export function BPTableLogic<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [filtering, setFiltering] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: defaultPagination,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: {
            sorting,
            globalFilter: filtering,
            columnFilters,
            columnVisibility,
        },
        onGlobalFilterChange: setFiltering,
    });

    const [inputValue, setInputValue] = React.useState("");
    const inputRef = React.useRef(null);

    const handlePageSizeChange = () => {
        const pageSize = Number(inputValue);
        if (!isNaN(pageSize)) {
            table.setPageSize(pageSize);
        } else {
            alert("Please enter a valid number");
        }
    };

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (
        <div>
            {/* Input field that makes it possible to search*/}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by column"
                    value={filtering}
                    onChange={(e) => {
                        setFiltering(e.target.value);
                    }}
                    className="max-w-sm"
                />
                <div className="collapsible inline-block border border-black shadow flex flex-row">
                    <div
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 cursor-pointer w-40 "
                        {...getToggleProps()}
                    >
                        {isExpanded ? "Close" : "Change Filters"}
                    </div>
                    <div {...getCollapseProps()}>
                        <div className="content flex flex-row ">
                            <div>
                                <label>
                                    <input
                                        {...{
                                            type: "checkbox",
                                            checked:
                                                table.getIsAllColumnsVisible(),
                                            onChange:
                                                table.getToggleAllColumnsVisibilityHandler(),
                                        }}
                                    />{" "}
                                    Toggle All
                                </label>
                            </div>
                            {table.getAllLeafColumns().map((column) => {
                                return (
                                    <div key={column.id}>
                                        <label>
                                            <input
                                                {...{
                                                    type: "checkbox",
                                                    checked:
                                                        column.getIsVisible(),
                                                    onChange:
                                                        column.getToggleVisibilityHandler(),
                                                }}
                                            />{" "}
                                            {column.id}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-md border">
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
                                // Create an array to collect the JSX for the current row and potentially an extra row
                                const rowElements = [];

                                // JSX for the current row
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

                                // Check your specific criteria to see if the additional row should be added
                                if (row.getIsExpanded()) {
                                    const BTDataArray =
                                        row.original.bladeTasks.map(
                                            (bladeTask: any) => ({
                                                id: Number(bladeTask.id),
                                                startDate: String(
                                                    bladeTask.startDate
                                                ),
                                                endDate: String(
                                                    bladeTask.endDate
                                                ),
                                                duration: String(
                                                    bladeTask.duration
                                                ),
                                                testType: String(
                                                    bladeTask.testType
                                                ),
                                                attachPeriod: String(
                                                    bladeTask.attachPeriod
                                                ),
                                                detachPeriod: String(
                                                    bladeTask.detachPeriod
                                                ),
                                                taskName: String(
                                                    bladeTask.taskName
                                                ),
                                                testRig: String(
                                                    bladeTask.testRig
                                                ),
                                            })
                                        );

                                    console.log(BTDataArray);

                                    rowElements.push(
                                        <TableRow key={`extra-${row.id}`}>
                                            <TableCell colSpan={6}>
                                                <TableLogicWOHeaders
                                                    columns={columnBT}
                                                    data={BTDataArray}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );

                                    // JSX for the additional row
                                }

                                // Return the combined JSX for both the standard and potentially the additional row
                                return rowElements;
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    className="h-24 text-center"
                                >
                                    {" "}
                                    {/* Adjust colSpan as needed */}
                                    No results.
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
                <StyledButton
                    className="bg-blue-500 text-white font-semibold py-2 px-4 border border-blue-700 rounded shadow hover:bg-blue-400 focus:outline-none focus:shadow-outline"
                    onClick={handlePageSizeChange}
                    disabled={!table.getCanNextPage()}
                >
                    Set Page Size
                </StyledButton>
                <input
                    className="border border-gray-300 rounded-md w-20 px-3 py-2 text-sm leading-4 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    ref={inputRef}
                />
            </div>
        </div>
    );
}
