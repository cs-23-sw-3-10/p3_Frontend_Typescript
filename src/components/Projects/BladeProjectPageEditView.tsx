import React, { useState, useContext } from "react";

import { columnBP } from "./BladeProjectColumns";
import { columnBT } from "../BladeTask/BladeTaskColumns";
import { useQuery } from "@apollo/client";
import { GET_ALL_BP } from "../../api/queryList";
import { GET_ALL_BT } from "../../api/queryList";
import { GET_ALL_BP_IN_DIFF_SCHEDULE } from "../../api/queryList";
import { TableLogicWOHeaders } from "../TableLogic/TableLogicWOHeader";
import { TableLogic } from "../TableLogic/TableLogic";
import ScheduleComponent from "../Schedule/ScheduleComponent";
import BladeTaskCard from "../Schedule/BladeTaskCard";
import DisplayComponent from "../Schedule/Display";
import CreateTimelineField from "../Schedule/TimelineField";
import CreateTestRigDivs from "../Schedule/TestRigDivs";
import { getMonthsInView } from "../Schedule/Display";
import { getMonthLength } from "../Schedule/TimelineField";
import { capitalizeFirstLetter } from "../Schedule/TimelineField";
import SwitchComponent from "../TableLogic/SwitchComponent";
import { TableModeContext } from "../TableLogic/TableContext";
/**
 * Calculates the number of months between start and enddate of a bladeproject,
 * which is used to regulate the number of months shown in the expanded table, when it is rendered
 * @param startDate: the start date of the bladeproject
 * @param endDate: the end date of the bladeproject
 * @returns: the number of months between the start and end date
 */
function countMonthsIncludingStartAndEnd(startDate: Date, endDate: Date) {
    // Calculate the month difference
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();

    // Adjust to include both start and end months
    return months + 1;
}

/**
 * gets all bladeprojects from the database and renders them in a table
 * if the bladeprojects contain bladeTasks, these are also rendered in a table when the bladeproject row is expanded
 * @returns the BladeProjectPage component
 */

function BladeProjectPageWithScheduleViewEdit() {
    const {contextViewMode, setViewMode} = useContext(TableModeContext)
    
    const [rigs, setRigs] = useState([
        // should be imported from database
        {
            rigName: "Rig 1",
            rigNumber: 1,
        },
        {
            rigName: "Rig 2",
            rigNumber: 2,
        },
        {
            rigName: "Rig 3",
            rigNumber: 3,
        },
        {
            rigName: "Rig 4",
            rigNumber: 4,
        },
        {
            rigName: "Rig 5",
            rigNumber: 5,
        },
        {
            rigName: "Rig 6",
            rigNumber: 6,
        },
    ]);

    //get data from the database
    const {
        loading: loadingBP,
        error: errorBP,
        data: dataBP,
    } = useQuery(GET_ALL_BP);


    const { 
        loading: loadingSchedule, 
        error: errorSchedule, 
        data: dataSchedule,
     } = useQuery(GET_ALL_BP_IN_DIFF_SCHEDULE);


    //handle loading and error states for the used queries
    /*
    if (loadingBP) return <p>Loading...</p>;
    if (errorBP) return <p> Error {errorBP.message}</p>;
    const BPData = dataBP["AllBladeProjects"];
    if (!BPData) {
        return <p> No data for {"AllBladeProjects"} </p>;
    }
*/
    //
    if (loadingSchedule) return <p>Loading...</p>;
    if (errorSchedule) return <p> Error {errorSchedule.message}</p>;
    const ScheduleData = dataSchedule["AllSchedules"];
    if (!ScheduleData) {
        return <p> No data for {"AllSchedules"} </p>;
    }


    let DataForScreen
    if(contextViewMode === true){
        DataForScreen = ScheduleData.filter((scheduleIsActiveCheck: any) => scheduleIsActiveCheck.id === "1")
           DataForScreen = DataForScreen[0].bladeProject
    }
    else if (contextViewMode === false){
        DataForScreen = ScheduleData.filter((scheduleIsActiveCheck: any) => scheduleIsActiveCheck.id === "2")
              DataForScreen = DataForScreen[0].bladeProject
    }


    /* renders the table. The renderExpandedComponent prop is used to render the bladeTasks table
     * based on the current row.id which is equal to the bladeproject ID.
     * The data for the TableLogicWOHeaders is therefore only containing the bladeTasks for the expanded bladeproject
     */
    return (

        <TableLogic
            columns={columnBP}
            data={DataForScreen}
            renderExpandedComponent={(row) => {
                let btCards: React.ReactNode[] = [];
                let bladeProjectIndex = dataBP["AllBladeProjects"].find(
                    (project: any) => project.id === row.id
                );

                const dates = getMonthsInView(
                    new Date(bladeProjectIndex.startDate),
                    countMonthsIncludingStartAndEnd(
                        new Date(bladeProjectIndex.startDate),
                        new Date(bladeProjectIndex.endDate)
                    )
                );

                if (bladeProjectIndex && bladeProjectIndex.bladeTasks) {
                    bladeProjectIndex.bladeTasks.forEach((bladeTask: any) => {
                        let dateSplit = bladeTask.startDate.split("-");
                        const year = parseInt(dateSplit[0]);
                        const month = parseInt(dateSplit[1]) - 1;
                        const day = parseInt(dateSplit[2]);

                        let endDateSplit = bladeTask.endDate.split("-");
                        const endYear = parseInt(endDateSplit[0]);
                        const endMonth = parseInt(endDateSplit[1]) - 1;
                        const endDate = parseInt(endDateSplit[2]);

                        btCards.push(
                            <BladeTaskCard
                                key={bladeTask.id}
                                duration={bladeTask.duration}
                                projectColor={bladeTask.bladeProject.color}
                                projectId={bladeTask.bladeProject.id}
                                customer={bladeTask.bladeProject.customer}
                                taskName={bladeTask.taskName}
                                startDate={new Date(year, month, day)}
                                endDate={new Date(endYear, endMonth, endDate)}
                                rig={bladeTask.testRig}
                                id={bladeTask.id}
                                enableDraggable={true}
                                attachPeriod={bladeTask.attachPeriod}
                                detachPeriod={bladeTask.detachPeriod}
                            />
                        );
                    });
                }
                return (
                    <div className="flex flex rows">
                        <CreateTestRigDivs rigs={rigs} />
                        <CreateTimelineField
                            rigs={rigs}
                            months={dates}
                            btCards={btCards}
                        />
                    </div>
                );
            }}
        />
    );
    
}

export default BladeProjectPageWithScheduleViewEdit;