"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BladeTaskQuery } from "./BTData";

export const columnBTID: ColumnDef<BladeTaskQuery>[] = [
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    BladeTask Name
                </button>
            );
        },
        accessorKey: "taskName",
        enableHiding: true,
        cell: ({ row, getValue }) => {
            return (
                <>
                    {row.getCanExpand() ? (
                        <button
                            {...{
                                onClick: () => {
                                    console.log("headingdf.name");
                                },
                                style: { cursor: "pointer" },
                            }}
                        >
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
                >
                    Test Rig
                </button>
            );
        },
        accessorKey: "testRig",
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Blade Project ID
                </button>
            );
        },
        accessorKey: "bladeProject.id",
    },
];

export const columnBT: ColumnDef<BladeTaskQuery>[] = [
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    BladeTask Name
                </button>
            );
        },
        accessorKey: "taskName",
        enableHiding: true,
        cell: ({ row, getValue }) => {
            return (
                <>
                    {row.getCanExpand() ? (
                        <button
                            {...{
                                onClick: () => {
                                    console.log("headingdf.name");
                                },
                                style: { cursor: "pointer" },
                            }}
                        >
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
                >
                    Test Rig
                </button>
            );
        },
        accessorKey: "testRig",
    },
];
