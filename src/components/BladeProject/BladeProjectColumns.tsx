"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BladeProjectDataQuery } from "./BladeProjectData";

export function getColumns(setShowPopup: Function, setChoosenBP: Function, editMode: Boolean) {

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
                            <button>
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
        {
            accessorKey: " ",
            cell: ({row, getValue}) => {
                if(editMode === true)
                {
                    return (
                        <>
                         <button
                                className="bg-gray-300 hover:bg-gray-500 w-10 rounded"
                                onClick={() => {
                                    setChoosenBP(row.original.id);
                                    setShowPopup(true);
                                }}
                            >
                                Edit
                            </button>
                            {getValue()}
                        </>
                    )
                }
                }
                    
        
            
        }
    ];
    return columnBP;
}
