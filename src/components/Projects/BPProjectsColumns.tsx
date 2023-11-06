"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BladeProject } from "./tempData";

export const columns: ColumnDef<BladeProject>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Project Name",
        accessorKey: "project_name",
    },
    {
        header: "Customer",
        accessorKey: "customer",
    },
    {
        header: "Project Leader",
        accessorKey: "project_leader",
    },
    {
        header: "Start Date",
        accessorKey: "start_date",
    },
    {
        header: "End Date",
        accessorKey: "end_date",
    },
    //Evt tilføj Status check?
];
