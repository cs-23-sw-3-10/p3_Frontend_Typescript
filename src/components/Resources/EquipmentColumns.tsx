"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EquipmentData } from "./tempDataEquipment";

export const columnEQ: ColumnDef<EquipmentData>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === "asc");
                    }}
                >
                    Name
                </button>
            );
        },
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
                            {row.getIsExpanded() ? "👇" : "👉"}
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
                            {row.getIsExpanded() ? "👇" : "👉"}
                        </button>
                    )}
                    {getValue()}
                </>
            );
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === "asc");
                    }}
                >
                    Equipment Type
                </button>
            );
        },
    },
];
