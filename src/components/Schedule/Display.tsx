import React from "react";
import { DndContext } from "@dnd-kit/core";
import "./Display.css";

function DisplayComponent() {
    return (
        <div className="ScheduleContentContainer">
            <div className="Display">
                {createTestRigDivs()}
                <DndContext>{createBladeTaskField()}</DndContext>
            </div>
            <div className="AdditionalContent">
                <h3>AdditionalContent</h3>
            </div>
        </div>
    );
}
export default DisplayComponent;

function createTestRigDivs() {
    return (
        <div className="TestRigContainer">
            <div className="dateSpace"></div>
            <div className="TestRig">
                <h1>TestRig</h1>
            </div>
        </div>
    );
}

function createBladeTaskField() {
    return (
        <div className="BladeTaskField">
            <div className="datesContainer"></div>
            <div className="BladeTask">
                <h1>BladeTask</h1>
            </div>
        </div>
    );
}
