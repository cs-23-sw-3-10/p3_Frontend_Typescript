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

    const [dates, setDates] = useState([
        new Date(firstStartDate),
        new Date(firstStartDate.getFullYear(), firstStartDate.getMonth() + 1),
        new Date(firstStartDate.getFullYear(), firstStartDate.getMonth() + 2),
    ]); // should be imported from database


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

    let btCards: React.ReactNode[] = [];
   
    
    
    /* renders the table. The renderExpandedComponent prop is used to render the bladeTasks table
     * based on the current row.id which is equal to the bladeproject ID. 
     * The data for the TableLogicWOHeaders is therefore only containing the bladeTasks for the expanded bladeproject
     */
    return (
        <TableLogic
            columns={columnBP}
            data={BPData}
            renderExpandedComponent={(row) => {
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
                            projectColor={`white`}
                          />     
                       )         
                    
                })|| [];


            return (
                < CreateTimelineField rigs={rigs} months={dates} btCards={dataForCurrentRow} />
            );
            }
            
            }
        />
    );
}

export default BladeProjectPageWSchedule;