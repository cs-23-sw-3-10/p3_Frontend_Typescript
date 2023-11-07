"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BladeProject } from "./tempData";
import { useContext } from "react";
import { BladeProjectDataQuery } from "./BPData";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<BladeProjectDataQuery>[] = [
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
    //Evt tilføj Status check?
];
