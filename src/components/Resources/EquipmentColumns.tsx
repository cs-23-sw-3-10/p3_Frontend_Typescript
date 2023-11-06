"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EquipmentData } from "./tempDataEquipment";

export const columns: ColumnDef<EquipmentData>[] = [
    {
        header: "Equipment ID",
        accessorKey: "id",
    },
    {
        header: "Equipment Type",
        accessorKey: "type",
    },
];
