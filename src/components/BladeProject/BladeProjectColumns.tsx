"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BladeProjectDataQuery } from "./BladeProjectData";

export function getColumns(setShowPopup: Function, setChoosenBP: Function) {
    const columnBP: ColumnDef<BladeProjectDataQuery>[] = [
        {
            header: ({ column }) => {
                return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Project Name</button>;
            },
            accessorKey: "projectName",
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
                        <button
                            className="bg-gray-200 hover:bg-gray-500 rounded"
                            onClick={() => {
                                setChoosenBP(row.original.id);
                                setShowPopup(true);
                            }}
                        >
                            Edit
                        </button>
                        {getValue()}
                    </>
                );
            },
        },

        {
            header: ({ column }) => {
                return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Customer</button>;
            },
            accessorKey: "customer",
        },
        {
            header: ({ column }) => {
                return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Project Leader</button>;
            },
            accessorKey: "projectLeader",
        },
        {
            header: ({ column }) => {
                return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Start Date</button>;
            },
            accessorKey: "startDate",
        },
        {
            header: ({ column }) => {
                return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>End Date</button>;
            },
            accessorKey: "endDate",
        },
    ];
    return columnBP;
}
