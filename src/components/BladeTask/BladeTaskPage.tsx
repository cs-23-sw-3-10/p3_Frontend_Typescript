import React, { useState } from "react";

import { columnBT } from "./BladeTaskColumns";
import { useQuery } from "@apollo/client";
import { TableLogic } from "../TableLogic/TableLogic";
import { TableLogicWOHeaders } from "../TableLogic/TableLogicWOHeader";
import { columnBookings } from "../Resources/BookingsColumns";
import { GET_ALL_BT_WITH_BOOKINGS_EQNAME, GET_ALL_BP_IN_DIFF_SCHEDULE } from "../../api/queryList";
import { useEditModeContext } from "../../EditModeContext";
import SwitchComponent from "../TableLogic/SwitchComponent";
import StyledButton from "../ui/styledButton";

/**
 * gets all bladetasks from the database and renders them in a table
 * if the bladetasks contain bookings, these are also rendered in a table when the bladetask row is expanded
 * @returns the BTPage component
 */
function BTPage() {
    const editMode = useEditModeContext();
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

    // get data from the database
    const { loading: loadingBT, error: errorBT, data: dataBT, refetch: refetchBT } = useQuery(GET_ALL_BT_WITH_BOOKINGS_EQNAME);
    const { loading: loadingScheduleBT, error: errorScheduleBT, data: dataScheduleBT, refetch: refetchBP } = useQuery(GET_ALL_BP_IN_DIFF_SCHEDULE);

    //handle loading and error states for the used queries
    if (loadingBT) return <p>Loading...</p>;
    if (errorBT)
        return (
            <>
                <p>Error: {errorBT.message}.</p>
                <p>Please reload the page or contact adminitrator</p>
            </>
        );

    const bladeTasks = dataBT["AllBladeTasks"];

    if (!bladeTasks) return <p> No data for {"AllBladeTasks"} </p>;

    if (loadingScheduleBT) return <p>Loading...</p>;
    if (errorScheduleBT)
        return (
            <>
                <p>Error: {errorScheduleBT.message}.</p>
                <p>Please reload the page or contact adminitrator</p>
            </>
        );
    const ScheduleDataBT = dataScheduleBT["AllSchedules"];

    //handle the data for the table regarding the view/edit mode
    let dataForScreen;
    if (editMode.isEditMode === false) {
        dataForScreen = ScheduleDataBT.filter((scheduleIsActive: any) => scheduleIsActive.id === "1");
        dataForScreen = dataForScreen[0].bladeProject.map((bladeTasks: any) => bladeTasks.bladeTasks).flat();
    } else {
        dataForScreen = ScheduleDataBT.filter((scheduleIsActive: any) => scheduleIsActive.id === "2");
        dataForScreen = dataForScreen[0].bladeProject.map((bladeTasks: any) => bladeTasks.bladeTasks).flat();
    }

    //Set correct durations, start- and end dates such that it is only for the test.
    dataForScreen = dataForScreen.map((task: any) => {
        let newStartDate = new Date(task.startDate);
        let newEndDate = new Date(task.endDate);
        newStartDate.setDate(newStartDate.getDate() + task.attachPeriod);
        newEndDate.setDate(newEndDate.getDate() - task.detachPeriod);
        const newDuration = task.duration - task.attachPeriod - task.detachPeriod;

        // Create a new object with the updated startDate
        return {
            ...task,
            startDate: newStartDate.toISOString().split("T")[0],
            endDate: newEndDate.toISOString().split("T")[0],
            duration: newDuration,
        };
    });
    refetchBT();
    refetchBP();

    /**
     * renders the table. The renderExpandedComponent prop is used to render the bookings table
     * based on the current row.id which is equal to the bladetask ID.
     */
    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-left mb-4 text-xl">Blade Tasks</h1>
                <div className="">
                    <SwitchComponent setShowPasswordPrompt={setShowPasswordPrompt} />
                    {localStorage.getItem("token") && (
                        <StyledButton
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.reload();
                            }}
                        >
                            {" "}
                            Logout{" "}
                        </StyledButton>
                    )}
                </div>
            </div>
            <p style={{ paddingBottom: "20px" }}>
                Duration, attach period and detach period are given in <b>days</b>.
            </p>
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
                                    name: String(booking.equipment?.name),
                                },
                                engineer: {
                                    name: String(booking.engineer?.name),
                                },
                                technician: {
                                    type: String(booking.technician?.type),
                                },
                                combined: [booking.equipment?.name, booking.engineer?.name, booking.technician?.type].filter((value) => value !== undefined),
                            })) || [];
                    return <TableLogicWOHeaders columns={columnBookings} data={bookingsDataForCurrentRow} />;
                }}
            />
        </>
    );
}

export default BTPage;
