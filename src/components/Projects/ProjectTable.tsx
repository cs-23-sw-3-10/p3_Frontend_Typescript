import React from "react";
import { TableLogic } from "../TableLogic/TableLogic";
import { DocumentNode } from "graphql";
import { useQuery } from "@apollo/client";
import { BPTableLogic } from "../TableLogic/BPTableLogic";

interface ProjectTableProps {
    query: DocumentNode;
    dataKey: string;
    columns: any;
}

function BTTable({ query, dataKey, columns }: ProjectTableProps) {
    const { loading, error, data } = useQuery(query);

    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error {error.message}</p>;

    const bladeProjectData = data[dataKey];

    if (!bladeProjectData) return <p> No data for {dataKey} </p>;

    return <BPTableLogic columns={columns} data={bladeProjectData} />;
}

export default BTTable;
