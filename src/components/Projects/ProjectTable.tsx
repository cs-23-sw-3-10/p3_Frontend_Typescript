import React from "react";
import { TableLogic } from "../TableLogic/TableLogic";
import { DocumentNode } from "graphql";
import { useQuery } from "@apollo/client";

interface ProjectTableProps {
    query: DocumentNode;
    dataKey: string;
    columns: any;
}

function ProjectTable({ query, dataKey, columns }: ProjectTableProps) {
    const { loading, error, data } = useQuery(query);

    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error {error.message}</p>;

    const bladeProjectData = data[dataKey];

    if (!bladeProjectData) return <p> No data for {dataKey} </p>;

    return <TableLogic columns={columns} data={bladeProjectData} />;
}

export default ProjectTable;
