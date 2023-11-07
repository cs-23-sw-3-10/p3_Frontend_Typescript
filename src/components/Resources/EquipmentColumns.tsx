"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EquipmentData } from "./tempDataEquipment";

export const columnEQ: ColumnDef<EquipmentData>[] = [
    {
        header: "Equipment Name",
        accessorKey: "name",
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
