import React from "react";
import { DndContext } from "@dnd-kit/core";
import "./Display.css";
import createTestRigDivs from "./TestRigDivs";
import createTimelineField from "./TimelineField";

let rigs = [ // should be imported from database
    "Rig 1",
    "Rig 2",
    "Rig 3",
    "Rig 4",
    "Rig 5",
    "Rig 6",
]

let dato = [
    new Date(2023,8,10), 
    new Date(2023,9,10), 
    new Date(2023,10,11), 
    new Date(2023,11,11),
    new Date(2024,0,11)
]; // should be imported from database

function DisplayComponent() {
    return (
        <div className="ScheduleContentContainer">
            <div className="ScheduleDisplay">
                {createTestRigDivs(rigs)} 
                <DndContext>{createTimelineField(rigs, dato)}</DndContext>
            </div>
            <div className="AdditionalContent">
                <h3>AdditionalContent</h3>
            </div>
        </div>
    );
}
export default DisplayComponent;