"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BladeProjectDataQuery } from "../Projects/BPData";

export const columnBTs: ColumnDef<BladeProjectDataQuery>[] = [
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    BladeTasks ID
                </button>
            );
        },
        id: "bladeTask.id",
        accessorFn: (row) => row.bladeTasks?.map((bladeTasks) => bladeTasks.id),
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
        id: "bladeTask.startDate",
        accessorFn: (row) =>
            row.bladeTasks?.map((bladeTasks) => bladeTasks.startDate),
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
        id: "bladeTask.endDate",
        accessorFn: (row) =>
            row.bladeTasks?.map((bladeTasks) => bladeTasks.endDate),
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
        id: "bladeTask.duration",
        accessorFn: (row) =>
            row.bladeTasks?.map((bladeTasks) => bladeTasks.duration),
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
        id: "bladeTask.testType",
        accessorFn: (row) =>
            row.bladeTasks?.map((bladeTasks) => bladeTasks.testType),
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
        id: "bladeTask.attachPeriod",
        accessorFn: (row) =>
            row.bladeTasks?.map((bladeTasks) => bladeTasks.attachPeriod),
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
        id: "bladeTask.detachPeriod",
        accessorFn: (row) =>
            row.bladeTasks?.map((bladeTasks) => bladeTasks.detachPeriod),
    },
    {
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Task Name
                </button>
            );
        },
        id: "bladeTask.taskName",
        accessorFn: (row) =>
            row.bladeTasks?.map((bladeTasks) => bladeTasks.taskName),
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
        id: "bladeTask.testRig",
        accessorFn: (row) =>
            row.bladeTasks?.map((bladeTasks) => bladeTasks.testRig),
    },
];
