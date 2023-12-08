"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BladeTaskQuery } from "./BladeTaskData";

export const columnBT: ColumnDef<BladeTaskQuery>[] = [
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    style={{ fontWeight: 'bold' }}
                >
                    BT Name
                </button>
            );
        },
        accessorKey: "taskName",
        cell: ({ row, getValue }) => {
            return (
                <>
                    {row.getCanExpand() ? (
                        <button>
                            {row.getIsExpanded() ? "▲" : "▼"}
                        </button>
                    ) : (
                        <button
                            {...{
                                onClick: () => {
                                    row.toggleExpanded();
                                },
                                style: { cursor: "pointer" },
                            }}
                        >
                            {row.getIsExpanded() ? "▲" : "▼"}
                        </button>
                    )}
                    {getValue()}
                </>
            );
        },
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    style={{ fontWeight: 'bold' }}
                >
                    Test Type
                </button>
            );
        },
        accessorKey: "testType",
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    style={{ fontWeight: 'bold' }}
                >
                    Start Date
                </button>
            );
        },
        accessorKey: "startDate",
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    style={{ fontWeight: 'bold' }}
                >
                    End Date
                </button>
            );
        },
        accessorKey: "endDate",
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    style={{ fontWeight: 'bold' }}
                >
                    Duration
                </button>
            );
        },
        accessorKey: "duration",
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    style={{ fontWeight: 'bold' }}
                >
                    Attach Period
                </button>
            );
        },
        accessorKey: "attachPeriod",
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    style={{ fontWeight: 'bold' }}
                >
                    Detach Period
                </button>
            );
        },
        accessorKey: "detachPeriod",
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    style={{ fontWeight: 'bold' }}
                >
                    Test Rig 
                </button>
            );
        },
        accessorKey: "testRig",
    },
];
