import React, { useState, useContext } from "react";

import {getColumns} from "./BladeProjectColumns";
import { GET_ALL_BP, GET_ALL_BP_IN_DIFF_SCHEDULE, GET_TEST_RIGS } from "../../api/queryList";
import { useQuery } from "@apollo/client";
import { TableLogic } from "../TableLogic/TableLogic";
import BladeTaskCard from "../Schedule/BladeTaskCard";
import CreateTimelineField from "../Schedule/TimelineField";
import CreateTestRigDivs from "../Schedule/TestRigDivs";
import { getMonthsInView } from "../Schedule/Display";
import { useEditModeContext } from "../../EditModeContext";
import { createRigs } from "../Schedule/Display";
import PopupWindow from "../ui/PopupWindow";
import BPMenu from "../CreateBPMenu/BPMenu";


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

function BladeProjectPage() {
    const editMode = useEditModeContext();
    const [rigs, setRigs] = useState <{rigName: string, rigNumber: number}[]>([{rigName: "No Rigs", rigNumber: 0}])
    const [showPopup, setShowPopup] = useState(false); // Used to show the popup when the user clicks edit in a task card
    const [choosenBP, setChoosenBP] = useState<any>(null); // Used to store the choosen bladeproject when the user clicks edit in a task card

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

     const {
        loading: loadingRigs,
        error: errorRigs,
        data: dataRigs,
     } = useQuery(GET_TEST_RIGS);


    //handle loading and error states for the used queries
    
    if (loadingBP) return <p>Loading...</p>;
    if (errorBP) return <p> Error {errorBP.message}</p>;
    const BPData = dataBP["AllBladeProjects"];
    if (!BPData) {
        return <p> No data for {"AllBladeProjects"} </p>;
    }

    //
    if (loadingSchedule) return <p>Loading...</p>;
    if (errorSchedule) return <p> Error {errorSchedule.message}</p>;
    const ScheduleData = dataSchedule["AllSchedules"];
    if (!ScheduleData) {
        return <p> No data for {"AllSchedules"} </p>;
    }


    if(loadingRigs) return <p>Loading...</p>;
    if(errorRigs) return <p> Error {errorRigs.message}</p>;
    const numberOfRigs = parseInt(dataRigs.DictionaryAllByCategory[0].label)
    if(rigs.length !== numberOfRigs){
        setRigs(createRigs(numberOfRigs))
    }


    let dataForScreen;
    if(editMode.isEditMode === false){
        dataForScreen = ScheduleData.filter((scheduleIsActiveCheck: any) => scheduleIsActiveCheck.id === "1")
        dataForScreen = dataForScreen[0].bladeProject
    }
    else {
        dataForScreen = BPData
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };


    
    /* renders the table. The renderExpandedComponent prop is used to render the bladeTasks table
     * based on the current row.id which is equal to the bladeproject ID.
     * The data for the TableLogicWOHeaders is therefore only containing the bladeTasks for the expanded bladeproject
     */
    return (
        <>
        <TableLogic
            columns={getColumns(setShowPopup, setChoosenBP)}
            data={dataForScreen}
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
                        btCards.push(
                            <BladeTaskCard
                                key={bladeTask.id}
                                duration={bladeTask.duration}
                                projectColor={bladeTask.bladeProject.color}
                                projectId={bladeTask.bladeProject.id}
                                customer={bladeTask.bladeProject.customer}
                                taskName={bladeTask.taskName}
                                startDate={new Date(bladeTask.startDate)}
                                rig={bladeTask.testRig}
                                id={bladeTask.id}
                                enableDraggable={false}
                                attachPeriod={bladeTask.attachPeriod}
                                detachPeriod={bladeTask.detachPeriod}
                                shown={true}
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
                            btCardsPending={[]}
                            isPendingTasksIncluded={false}
                       
                        />
                    </div>
                );
            }}
            />
            {showPopup && <PopupWindow component={<BPMenu creator={false} BPName={choosenBP}/>} onClose={togglePopup}/>}
        </>
    );
}
export default BladeProjectPage;
