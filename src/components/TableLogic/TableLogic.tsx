"use client";
import React from "react";
import StyledButton from "../ui/styledButton";
import { useCollapse } from "react-collapsed";
import { Input } from "../ui/input";
import { TableModeContext } from "./TableContext";
import { useContext } from "react";

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

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import SwitchComponent from "./SwitchComponent";

/**
 * Represents the props for the DataTable component.
 * columns: 
 * data:
 * renderExpandedComponent:
 */
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    renderExpandedComponent?: (props?: any) => JSX.Element;
}

/**
 * Represents the state of pagination for a table.
 */
type PaginationState = {
    pageIndex: number;
    pageSize: number;
};

/**
 * Represents the default pagination state for a table.
 * PageIndex: What page the table is on when rendered.
 * PageSize: How many rows are displayed per page.
 */
const defaultPagination: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
};

export function TableLogic<TData, TValue>({
    columns,
    data,
    renderExpandedComponent,
}: DataTableProps<TData, TValue>) {

    //List of useState hooks that are used to set the state of the table.
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [filtering, setFiltering] = React.useState("");
    const [expanded, setExpanded] = React.useState<ExpandedState>({});
    const [inputValue, setInputValue] = React.useState("");
    const { getToggleProps } = useCollapse();

    /**  
     * The useReactTable hook is used to create a table .
     * First data and columns are passed in, then various RowModels are passed in to enable the functionalities.
     * Set functions are passed in to handle the state of the table
     * state: enables the table to be controlled by the React useState hooks. 
     */
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
        onGlobalFilterChange: setFiltering,
        state: {
            sorting,
            globalFilter: filtering,
            columnFilters,
            columnVisibility,
            expanded,
        },
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
            {/* global filtering textfield*/}
            <div className="flex items-center py-4" >
                <Input
                    placeholder="Filter by column"
                    value={filtering}
                    onChange={(e) => {
                        setFiltering(e.target.value);
                    }}
                    className="max-w-sm"
                />
                <div>
                    {/* popover for changing column visibility*/}
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 r-100 capitalize">
                                Change Filters
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white">
                            {/* renders a checkbox that changes the visibility of different columns in the table. 
                                ...getToggleProps gets all the necessary props for the Popover */}
                            <div {...getToggleProps()}>
                                {/* creates the Toogle All button that either mark every checkbox or unmark them  */}
                                <div className="">
                                    <div>
                                        <label>
                                            <input
                                                {...{
                                                    type: "checkbox",
                                                    checked:
                                                        table.getIsAllColumnsVisible(), //determine if all columns are currently visible.
                                                    onChange:
                                                        table.getToggleAllColumnsVisibilityHandler(), //get the handler function to toggle the visibility of all columns.
                                                }}
                                            />{" "}
                                            Toggle All
                                        </label>
                                    </div>
                                    {/* get all leaf columns of the table. For each column, it renders a checkbox and the column id. */}
                                    {table.getAllLeafColumns().map((column) => { 
                                        return (
                                            <div key={column.id}>
                                                <label>
                                                    <input
                                                        {...{
                                                            type: "checkbox",
                                                            checked:
                                                                column.getIsVisible(), //determine if the current column is visible.
                                                            onChange:
                                                                column.getToggleVisibilityHandler(), //get the handler function to toggle the visibility of the current column.
                                                        }}
                                                    />{" "}
                                                    {column.id.replace(/([A-Z])/g, " $1").replace(/([_.])/g," ").replace(/^./, function (str) {return str.toUpperCase();})}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            {/* We do not use this ATM */}
                <div className="ml-10">
                    <StyledButton>
                        Create {window.location.pathname.split("/")[1]}
                    </StyledButton>
                </div>
                <div>
                    <SwitchComponent viewMode={true}/>
                </div>
            </div>

            {/* the actual table that is rendered */}
            <div className="rounded-md border">
                <Table>
                    {/* table header that is generated by mapping through the headers definition
                     from the respective table columns definition */}
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender( //renders the header by using the columnDef.header function and the header context
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
                        {/* table body that is generated by mapping through the rows definition, if there is a row, if there is none the "No Data Available" TableCell is generated*/}
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row: any) => {
                                
                                //creates a row element for each row in the table
                                const rowElements = [];

                                //pushes the row element into the rowElements array
                                rowElements.push(
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected()
                                                ? "selected"
                                                : undefined
                                        }
                                    >
                                        {/* maps over the visible cells in the current row. For each cell, it creates a TableCell element */}
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
                                //if the row is expanded, it pushes the expanded component into the rowElements array
                                //the expanded component is defined when the TableLogic component is called
                                if (row.getIsExpanded()) {
                                    rowElements.push(
                                        <TableRow key={`extra ${row.id}`}>
                                            <TableCell colSpan={columns.length}>
                                                {renderExpandedComponent
                                                    ? renderExpandedComponent(
                                                          row.original
                                                      )
                                                    : null}
                                            </TableCell>
                                        </TableRow>
                                    );
                                    console.log(row.original);
                                }
                                return rowElements;
                            })
                        ) : 
                        //if there is no row, it renders a table row with a table cell that says "No data available". Happens if no data is fetched from the database
                        (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Buttons to change the rendered page and change pagination size */}
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
