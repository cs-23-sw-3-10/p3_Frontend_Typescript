"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BookingDataQuery } from "./BookingData";

export const createColumn = (
    header: React.ReactNode,
    accessorKey: string
): ColumnDef<BookingDataQuery> => {
    return {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {header}
                </button>
            );
        },
        accessorKey: accessorKey,
    };
};

export const columnBookings: ColumnDef<BookingDataQuery>[] = [
    createColumn("Booking Id", "id"),
    createColumn("Start Date", "startDate"),
    createColumn("End Date", "endDate"),
    createColumn("Duration", "duration"),
    createColumn("Resource Type", "resourceType"),
    createColumn("Work Hours", "workHours"),
];
