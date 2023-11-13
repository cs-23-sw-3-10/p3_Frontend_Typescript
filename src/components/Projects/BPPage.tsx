import React from "react";

import { columnBP } from "./BPProjectsColumns";
import { columnBT } from "../BladeTask/BTC";
import { columnBTID } from "../BladeTask/BTC";
import { useQuery } from "@apollo/client";
import { GET_ALL_BP } from "../../api/queryList";
import { GET_ALL_BT } from "../../api/queryList";
import { TableLogicWOHeaders } from "../TableLogic/TableLogicWOHeader";
import { TableLogic } from "../TableLogic/TableLogic";
import ScheduleComponent from "../Schedule/ScheduleComponent";
import BTPage from "../BladeTask/BladeTaskPage";
import { columnBookings } from "../Resources/BookingsColumns";

function BladeProjectPage() {
    const {
        loading: loadingBP,
        error: errorBP,
        data: dataBP,
    } = useQuery(GET_ALL_BP);
    const {
        loading: loadingBT,
        error: errorBT,
        data: dataBT,
    } = useQuery(GET_ALL_BT);

    if (loadingBP) return <p>Loading...</p>;
    if (errorBP) return <p> Error {errorBP.message}</p>;
    const BPData = dataBP["AllBladeProjects"];
    if (!BPData) {
        return <p> No data for {"AllBladeProjects"} </p>;
    }

    if (loadingBT) return <p>Loading...</p>;
    if (errorBT) return <p> Error {errorBT.message}</p>;

    const BTData = dataBT["AllBladeTasks"];
    if (!BTData) {
        return <p> No data for {"AllBladeTasks"} </p>;
    }

    return (
        <TableLogic
            columns={columnBP}
            data={BPData}
            renderExpandedComponent={(row) => {
                // Filter bladeTasksData based on the current row.id
                const bladeTasksDataForCurrentRow =
                    dataBP["AllBladeProjects"]
                        .find((project: any) => project.id === row.id)
                        ?.bladeTasks.map((bladeTask: any) => ({
                            id: Number(bladeTask.id),
                            startDate: String(bladeTask.startDate),
                            endDate: String(bladeTask.endDate),
                            duration: Number(bladeTask.duration),
                            testType: String(bladeTask.testType),
                            attachPeriod: Number(bladeTask.attachPeriod),
                            detachPeriod: Number(bladeTask.detachPeriod),
                            taskName: String(bladeTask.taskName),
                            testRig: String(bladeTask.testRig),
                        })) || [];

                return (
                    <TableLogicWOHeaders
                        columns={columnBT}
                        data={bladeTasksDataForCurrentRow}
                        
                    />
                );
            }}
        />
    );
}

/*
 
*/
export default BladeProjectPage;

/*
    const bladeTasksData = dataBP["AllBladeProjects"].flatMap((project: any) =>
        project.bladeTasks.map((bladeTask: any) => ({
            id: Number(bladeTask.id),
            startDate: String(bladeTask.startDate),
            endDate: String(bladeTask.endDate),
            duration: String(bladeTask.duration),
            testType: String(bladeTask.testType),
            attachPeriod: String(bladeTask.attachPeriod),
            detachPeriod: String(bladeTask.detachPeriod),
            taskName: String(bladeTask.taskName),
            testRig: String(bladeTask.testRig),
        }))
    );*/
