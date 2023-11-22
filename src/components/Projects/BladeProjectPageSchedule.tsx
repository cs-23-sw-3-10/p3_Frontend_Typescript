import React, {useState} from "react";

import { columnBP } from "./BladeProjectColumns";
import { columnBT } from "../BladeTask/BladeTaskColumns";
import { useQuery } from "@apollo/client";
import { GET_ALL_BP } from "../../api/queryList";
import { GET_ALL_BT } from "../../api/queryList";
import { TableLogicWOHeaders } from "../TableLogic/TableLogicWOHeader";
import { TableLogic } from "../TableLogic/TableLogic";
import ScheduleComponent from "../Schedule/ScheduleComponent";
import BladeTaskCard from "../Schedule/BladeTaskCard";
import DisplayComponent from "../Schedule/Display";
import CreateTimelineField from "../Schedule/TimelineField";
import { getMonthsInView } from "../Schedule/Display";
import { getMonthLength } from "../Schedule/TimelineField";
import { capitalizeFirstLetter } from "../Schedule/TimelineField";

let date = new Date(Date.now());
const firstStartDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
);


/**
 * gets all bladeprojects from the database and renders them in a table
 * if the bladeprojects contain bladeTasks, these are also rendered in a table when the bladeproject row is expanded
 * @returns the BladeProjectPage component
 */

function countMonthsIncludingStartAndEnd(startDate: Date, endDate: Date) {

    // Calculate the month difference
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();

    // Adjust to include both start and end months
    return months + 1;
}


function BladeProjectPageWSchedule() {
    const [rigs, setRigs] = useState([
        // should be imported from database
        {
            rigName: "Rig 1",
            rigNumber: 1
        },
        {
            rigName: "Rig 2",
            rigNumber: 2
        },
        {
            rigName: "Rig 3",
            rigNumber: 3
        },
        {
            rigName: "Rig 4",
            rigNumber: 4
        },
        {
            rigName: "Rig 5",
            rigNumber: 5
        },
        {
            rigName: "Rig 6",
            rigNumber: 6
        }
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
                
                let bladeProjectIndex = dataBP["AllBladeProjects"].find((project: any) => project.id === row.id)

                
                const dates = getMonthsInView(new Date(bladeProjectIndex.startDate), countMonthsIncludingStartAndEnd(new Date(bladeProjectIndex.startDate), new Date(bladeProjectIndex.endDate))); 
                    


                if(bladeProjectIndex && bladeProjectIndex.bladeTasks){
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
                            taskName={bladeTask.taskName}
                            startDate={new Date(year, month, day)}
                            endDate={new Date(endYear, endMonth, endDate)}
                            rig={bladeTask.testRig}
                            id={bladeTask.id}
                        />
                    );           
                    
                })}
                return (
                    console.log("btC",btCards),
                    <CreateTimelineField rigs={rigs} months={dates} btCards={btCards} />
                )}}
                
        />
    );
}

export default BladeProjectPageWSchedule;

/*
const dataForCurrentRow = dataBP["AllBladeProjects"].find((project: any) => project.id === row.id)
                ?.bladeTasks.map((bladeTask: any) => {
                    let dateSplit = bladeTask.startDate.split("-");
                    const year = parseInt(dateSplit[0]);
                    const month = parseInt(dateSplit[1]) - 1;
                    const day = parseInt(dateSplit[2]);

                    return(
                        <BladeTaskCard
                            key={bladeTask.id}
                            duration={bladeTask.duration}
                            taskName={bladeTask.taskName}
                            startDate={new Date(year, month, day)}
                            rig={bladeTask.testRig}
                            id={bladeTask.id}
                            projectColor={bladeTask.bladeProject.color}
                          />     
                       )         
                    
                })|| [];

              
            return (
                < CreateTimelineField rigs={rigs} months={dates} btCards={dataForCurrentRow} />
            );*/