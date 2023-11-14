import "react-calendar-timeline/lib/Timeline.css";
import GetBladeTaskDateInfo from './scheduleQueries';
import DisplayComponent from "./Display";
import React, { useState } from "react";
import { set } from "date-fns";

function ScheduleComponent() {
    const [editMode, setEditMode] = useState(false);

    const viewSchedule = DisplayComponent(editMode, setEditMode);
    let editSchedule = DisplayComponent(editMode, setEditMode);

    
    const scheduleHeader = [
        <h1>Edit Mode</h1>,
        <h1>View Mode</h1>
    ];

    return (
        <div>
            {editMode ? scheduleHeader[0] : scheduleHeader[1]}
            {editMode ? editSchedule : viewSchedule}
        </div>
    );
}
export default ScheduleComponent;
