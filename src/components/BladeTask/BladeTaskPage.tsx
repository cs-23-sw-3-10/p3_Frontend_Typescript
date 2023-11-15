import React from "react";

import { columnBTID } from "./BladeTaskColumns";
import { useQuery } from "@apollo/client";
import { GET_ALL_BT } from "../../api/queryList";
import { TableLogic } from "../TableLogic/TableLogic";
import { TableLogicWOHeaders } from "../TableLogic/TableLogicWOHeader";
import { columnBookings } from "../Resources/BookingsColumns";

/**
 * gets all bladetasks from the database and renders them in a table
 * if the bladetasks contain bookings, these are also rendered in a table when the bladetask row is expanded
 * @returns the BTPage component
 */
function BTPage() {
    // get data from the database
    const { loading, error, data } = useQuery(GET_ALL_BT);

    //handle loading and error states for the used queries
    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error {error.message}</p>;

    const bladeTasks = data["AllBladeTasks"];

    if (!bladeTasks) return <p> No data for {"AllBladeTasks"} </p>;

    /**
     * renders the table. The renderExpandedComponent prop is used to render the bookings table
     * based on the current row.id which is equal to the bladetask ID.
     */
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
