import React from "react";

import { columnBT } from "./BladeTaskColumns";
import { useQuery } from "@apollo/client";
import { TableLogic } from "../TableLogic/TableLogic";
import { TableLogicWOHeaders } from "../TableLogic/TableLogicWOHeader";
import { columnBookings } from "../Resources/BookingsColumns";
import { GET_ALL_BT_WITH_BOOKINGS_EQNAME, GET_ALL_BP_IN_DIFF_SCHEDULE } from "../../api/queryList";
import { useEditModeContext } from "../../EditModeContext";

/**
 * gets all bladetasks from the database and renders them in a table
 * if the bladetasks contain bookings, these are also rendered in a table when the bladetask row is expanded
 * @returns the BTPage component
 */
function BTPage() {
    const editMode = useEditModeContext();

    // get data from the database
    const { loading: loadingBT, error: errorBT, data: dataBT } = useQuery(GET_ALL_BT_WITH_BOOKINGS_EQNAME);
    const {loading: loadingScheduleBT, error: errorScheduleBT, data: dataScheduleBT} = useQuery(GET_ALL_BP_IN_DIFF_SCHEDULE);


    //handle loading and error states for the used queries
    if (loadingBT) return <p>Loading...</p>;
    if (errorBT) return <p> Error {errorBT.message}</p>;

    const bladeTasks = dataBT["AllBladeTasks"];
  
    if (!bladeTasks) return <p> No data for {"AllBladeTasks"} </p>;

    if(loadingScheduleBT) return <p>Loading...</p>;
    if(errorScheduleBT) return <p> Error {errorScheduleBT.message}</p>;
    const ScheduleDataBT = dataScheduleBT["AllSchedules"];
    
    //handle the data for the table regarding the view/edit mode
    let dataForScreen;
    if(editMode.isEditMode === false){
        dataForScreen = ScheduleDataBT.filter((scheduleIsActive: any) => scheduleIsActive.id === "1")
        dataForScreen = dataForScreen[0].bladeProject.map((bladeTasks: any) => bladeTasks.bladeTasks).flat()
    }
    else{
        dataForScreen = ScheduleDataBT.filter((scheduleIsActive: any) => scheduleIsActive.id === "2")
        dataForScreen = dataForScreen[0].bladeProject.map((bladeTasks: any) => bladeTasks.bladeTasks).flat()
    }

    /**
     * renders the table. The renderExpandedComponent prop is used to render the bookings table
     * based on the current row.id which is equal to the bladetask ID.
     */
    return (
        <TableLogic
            columns={columnBT}
            data={dataForScreen}
            renderExpandedComponent={(row) => {
                const bookingsDataForCurrentRow =
                    dataBT["AllBladeTasks"]
                        .find((bladeTask: any) => bladeTask.id === row.id)
                        ?.bookings.map((booking: any) => ({
                            id: Number(booking.id),
                            startDate: String(booking.startDate),
                            endDate: String(booking.endDate),
                            duration: Number(booking.duration),
                            resourceType: String(booking.resourceType),
                            workHours: Number(booking.workHours),
                            equipment: {
                                id: Number(booking.equipment?.id),
                                name: String(booking.equipment?.name)
                            },
                            engineer: {
                                name: String(booking.engineer?.name)
                            },
                            technician: {
                                type: String(booking.technician?.type),
                            },
                            combined: [
                                booking.equipment?.name,
                                booking.engineer?.name,
                                booking.technician?.type
                            ].filter(value => value !== undefined)
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
