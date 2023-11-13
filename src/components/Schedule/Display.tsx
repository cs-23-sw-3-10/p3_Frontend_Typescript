import React from "react";
import { DndContext } from "@dnd-kit/core";
import "./Display.css";
import createTestRigDivs from "./TestRigDivs";
import createBladeTaskField from "./BladeTaskField";
import { nextWednesday } from "date-fns";

let rigs = [
    "Rig 1",
    "Rig 2",
    "Rig 3",
    "Rig 4",
    "Rig 5",
    "Rig 6",
]


let dato = [new Date(2023,9,10), new Date(Date.now()), new Date(2023,11,11)];

function DisplayComponent() {
    return (
        <div className="ScheduleContentContainer">
            <div className="Display">
                {createTestRigDivs(rigs)}
                <DndContext>{createBladeTaskField(rigs, dato)}</DndContext>
            </div>
            <div className="AdditionalContent">
                <h3>AdditionalContent</h3>
            </div>
        </div>
    );
}
export default DisplayComponent;