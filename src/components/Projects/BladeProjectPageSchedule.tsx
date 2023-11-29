import React, { useState } from "react";

import { columnBP } from "./BladeProjectColumns";
import { columnBT } from "../BladeTask/BladeTaskColumns";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_ALL_BP, GET_BT_IN_RANGE } from "../../api/queryList";
import { GET_ALL_BT } from "../../api/queryList";
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
import { start } from "repl";
import { shouldAutoRemoveFilter } from "@tanstack/table-core";


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

function BladeProjectPageWithSchedule() {
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




    //handle loading and error states for the used queries
    if (loadingBP) return <p>Loading...</p>;
    if (errorBP) return <p> Error {errorBP.message}</p>;
    const BPData = dataBP["AllBladeProjects"];
    if (!BPData) {
        return <p> No data for {"AllBladeProjects"} </p>;
    }

    
  
    console.log(BPData);

    /* renders the table. The renderExpandedComponent prop is used to render the bladeTasks table
     * based on the current row.id which is equal to the bladeproject ID.
     * The data for the TableLogicWOHeaders is therefore only containing the bladeTasks for the expanded bladeproject
     */
    return (
        <TableLogic
            columns={columnBP}
            data={BPData}
            renderExpandedComponent={(row) => {
                let btCards: React.ReactNode[] = [];
                let btCardsPending: React.ReactNode[] = [];
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
                        if (
                            bladeTask.startDate &&
                            bladeTask.endDate &&
                            bladeTask.testRig
                        ) {
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
                                    endDate={
                                        new Date(endYear, endMonth, endDate)
                                    }
                                    rig={bladeTask.testRig}
                                    id={bladeTask.id}
                                    enableDraggable={false}
                                    attachPeriod={bladeTask.attachPeriod}
                                    detachPeriod={bladeTask.detachPeriod}
                                    shown={true}
                                />
                            );
                        } else {
                            btCardsPending.push(
                                <BladeTaskCard
                                    key={bladeTask.id}
                                    duration={bladeTask.duration}
                                    attachPeriod={bladeTask.attachPeriod}
                                    detachPeriod={bladeTask.detachPeriod}
                                    projectColor={bladeTask.bladeProject.color}
                                    projectId={bladeTask.bladeProject.id}
                                    customer={bladeTask.bladeProject.customer}
                                    taskName={bladeTask.taskName}
                                    id={bladeTask.id}
                                    enableDraggable={false}
                                    shown={true}
                                />
                            );
                        }
                    });
                }
                return (
                    <div className="flex flex rows">
                        <CreateTestRigDivs rigs={rigs} />
                        <CreateTimelineField
                            rigs={rigs}
                            months={dates}
                            btCards={btCards}
                            btCardsPending={btCardsPending}
                            isPendingTasksIncluded={false}
                        />
                    </div>
                );
            }}
        />
    );
}

export default BladeProjectPageWithSchedule;
