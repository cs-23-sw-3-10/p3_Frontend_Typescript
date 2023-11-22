"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BookingDataQuery } from "./BookingData";

export const columnBookings: ColumnDef<BookingDataQuery>[] = [
    {
        accessorKey:"combined",
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Specific Resource
                </button>
            );
        },
    },
    {
        accessorKey: "resourceType",
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Resource Type
                </button>
            );
        },
    },
    {
        accessorKey: "startDate",
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
    },
    {
        accessorKey: "endDate",
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
    },
    {
        accessorKey: "duration",
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
    },
    {
        accessorKey: "workHours",
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Work Hours
                </button>
            );
        },
    },
];
