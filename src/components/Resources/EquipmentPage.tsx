import React from "react";

import { columnEQ } from "./EquipmentColumns";
import { useQuery } from "@apollo/client";
import { GET_EQUIPMENT } from "../../api/queryList";
import ScheduleComponent from "../Schedule/ScheduleComponent";
import { TableLogic } from "../TableLogic/TableLogic";
import Login from "../ui/login";

function EquipmentPage() {
    const { loading, error, data } = useQuery(GET_EQUIPMENT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error {error.message}</p>;

    const equipmentData = data["AllEquipment"];
    if (!equipmentData) {
        return <p> No data for {"ALLEquipment"} </p>;
    }

    return (
        <>
        <TableLogic
            columns={columnEQ}
            data={equipmentData}
            renderExpandedComponent={() => <ScheduleComponent />}
        />
        //<Login />
        </>
    );
}

export default EquipmentPage;
