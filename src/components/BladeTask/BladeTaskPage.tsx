import React from "react";

import { columnBTID } from "./BTC";
import { useQuery } from "@apollo/client";
import { GET_ALL_BT } from "../../api/queryList";
import { TableLogic } from "../TableLogic/TableLogic";
import ScheduleComponent from "../Schedule/ScheduleComponent";
import { columnEQ } from "../Resources/EquipmentColumns";
import { TableLogicWOHeaders } from "../TableLogic/TableLogicWOHeader";
import { columnBookings } from "../Resources/BookingsColumns";

function BTPage() {
    const { loading, error, data } = useQuery(GET_ALL_BT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error {error.message}</p>;

    const bladeTasks = data["AllBladeTasks"];

    if (!bladeTasks) return <p> No data for {"AllBladeTasks"} </p>;

    return (
        <TableLogic
            columns={columnBTID}
            data={bladeTasks}
            renderExpandedComponent={(row) => {
                const bookingsDataForCurrentRow =
                    data["AllBladeTasks"]
                        .find((bladeTask: any) => bladeTask.id === row.id)
                        ?.bookings.map((booking: any) => ({
                            id: Number(booking.id),
                            startDate: String(booking.startDate),
                            endDate: String(booking.endDate),
                            duration: Number(booking.duration),
                            resourceType: String(booking.resourceType),
                            workHours: Number(booking.workHours),
                        })) || [];
                return (
                    <TableLogicWOHeaders
                        columns={columnBookings}
                        data={bookingsDataForCurrentRow}
                    />
                );
            }}
        />
    );
}

export default BTPage;
