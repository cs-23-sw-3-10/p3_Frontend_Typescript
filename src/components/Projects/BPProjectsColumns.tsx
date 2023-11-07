"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BladeProject } from "./tempData";
import { useContext } from "react";
import { BladeProjectDataQuery } from "./BPData";

export const columns: ColumnDef<BladeProjectDataQuery>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Project Name",
        accessorKey: "projectName",
    },
    {
        header: "Customer",
        accessorKey: "customer",
    },
    {
        header: "Project Leader",
        accessorKey: "projectLeader",
    },
    {
        header: "Start Date",
        accessorKey: "startDate",
    },
    {
        header: "End Date",
        accessorKey: "endDate",
    },
    //Evt tilføj Status check?
];
