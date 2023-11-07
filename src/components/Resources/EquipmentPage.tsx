import React from "react";

import { TableLogic } from "../TableLogic/TableLogic";
import { EquipmentData } from "./tempDataEquipment";
import { DocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client";

interface EquipmenPageProps {
    query: DocumentNode;
    dataKey: string;
    columns: any;
}

function EquipmentPage({ query, dataKey, columns }: EquipmenPageProps) {
    const { loading, error, data } = useQuery(query);

    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error {error.message}</p>;

    const equipmentData = data[dataKey];
    if (!equipmentData) {
        return <p> No data for {dataKey} </p>;
    }

    return <TableLogic columns={columns} data={equipmentData} />;
}

export default EquipmentPage;
