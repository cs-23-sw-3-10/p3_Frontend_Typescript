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
    setDragging: React.Dispatch<React.SetStateAction<boolean>>;
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
    setDragging: React.Dispatch<React.SetStateAction<boolean>>;
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
        //create random background color for each date using math.random and hex color codes
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        //backgroundColor: weekDay === 0 || weekDay === 6 ? "lightgrey" : "white", // Default color
    };

    const dateProps: RigFieldDateDroppableProps = {
        className: "RigFieldDate",
        id: idSTR,
        rig: props.rig,
        date: props.date,
        style: dateStyle,
        bladeTaskHolder: props.bladeTaskHolder,
        setDragging: props.setDragging,
    };

    return Droppable(dateProps);
}
export default CreateRigFieldDate;

function Droppable(props: RigFieldDateDroppableProps) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });

    return (
        <div
            ref={setNodeRef}
            key={props.id}
            className="RigFieldDate"
            id={props.id}
            style={props.style}
        ></div>
    );
}
