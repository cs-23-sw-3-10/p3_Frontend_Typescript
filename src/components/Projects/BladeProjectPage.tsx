import React from "react";

import { columnBP } from "./BladeProjectColumns";
import { columnBT } from "../BladeTask/BladeTaskColumns";
import { useQuery } from "@apollo/client";
import { GET_ALL_BP } from "../../api/queryList";
import { GET_ALL_BT } from "../../api/queryList";
import { TableLogicWOHeaders } from "../TableLogic/TableLogicWOHeader";
import { TableLogic } from "../TableLogic/TableLogic";

/**
 * gets all bladeprojects from the database and renders them in a table
 * if the bladeprojects contain bladeTasks, these are also rendered in a table when the bladeproject row is expanded
 * @returns the BladeProjectPage component
 */

function BladeProjectPage() {
    //get data from the database
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


    //handle loading and error states for the used queries
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

    /* renders the table. The renderExpandedComponent prop is used to render the bladeTasks table
     * based on the current row.id which is equal to the bladeproject ID. 
     * The data for the TableLogicWOHeaders is therefore only containing the bladeTasks for the expanded bladeproject
     */
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

export default BladeProjectPage;