"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BladeProjectDataQuery } from "./BladeProjectData";

export const columnBP: ColumnDef<BladeProjectDataQuery>[] = [
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ID
                </button>
            );
        },
        accessorKey: "id",
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
                    Project Name
                </button>
            );
        },
        accessorKey: "projectName",
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Customer
                </button>
            );
        },
        accessorKey: "customer",
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Project Leader
                </button>
            );
        },
        accessorKey: "projectLeader",
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
];
