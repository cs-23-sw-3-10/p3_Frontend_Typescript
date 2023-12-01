import { useDroppable } from "@dnd-kit/core";
import { BladeTaskHolder } from "./BladeTaskHolder";
import React from "react";

interface RigFieldDateDroppableProps {
    className: "RigFieldDate";
    id: string;
    rig: string;
    date: Date;
    style: RigFieldDateStyle;
    bladeTaskHolder: BladeTaskHolder;
}

interface RigFieldDateStyle {
    gridColumn: string;
    gridRow: "1";
    backgroundColor: string;
}

type RigFieldDateProps = {
    rig: string;
    date: Date;
    bladeTaskHolder: BladeTaskHolder;
};

function CreateRigFieldDate(props: RigFieldDateProps) {
    const year = props.date.getFullYear();
    const monthNumber = props.date.getMonth();
    const dateNumber = props.date.getDate();
    const weekDay = props.date.getDay(); // 0 = Sunday, 6 = Saturday to gray out weekends
    const idSTR = `${props.rig}-${year}-${monthNumber}-${dateNumber}`; // id for the date div

    const dateStyle: RigFieldDateStyle = {
        gridColumn: `date-${year}-${monthNumber}-${dateNumber}`,
        gridRow: "1",
        backgroundColor: weekDay === 0 || weekDay === 6 ? "lightgrey" : "white", // Gray out weekends
    };

    const dateProps: RigFieldDateDroppableProps = {
        className: "RigFieldDate",
        id: idSTR,
        rig: props.rig,
        date: props.date,
        style: dateStyle,
        bladeTaskHolder: props.bladeTaskHolder,
    };

    return Droppable(dateProps); // Create a droppable date
}
export default CreateRigFieldDate;

function Droppable(props: RigFieldDateDroppableProps) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });

    return ( // Create a droppable date
        <div
            ref={setNodeRef}
            key={props.id}
            className="RigFieldDate"
            id={props.id}
            style={props.style}
        ></div>
    );
}
