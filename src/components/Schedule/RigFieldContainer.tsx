import CreateRigFieldDate from "./RigFieldDate";
import React, { useState } from "react";
import { BladeTaskHolder } from "./BladeTaskHolder";

type RigFieldContainerProps = {
    rig: string;
    allDates: Date[];
    fieldWidth: number;
    columns: string; // The columns of the schedule
    BladeTaskHolder: BladeTaskHolder;
    BladeTaskCards: React.ReactNode[];
    isDragging: boolean;
    setDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateRigFieldContainer(props: RigFieldContainerProps) {
    const rigStyle = {
        width: `${props.fieldWidth}px`,
        gridTemplateColumns: props.columns, // The righas columns corresponding to the schedule
        gridTemplateRows: "auto",
    };

    // const [bladeTaskCards, setBladeTaskCards] = useState([
    //     ...props.BladeTaskCards,
    // ]);

    return (
        <div key={props.rig} className="RigField" style={rigStyle}>
            {props.allDates.map(
                (date) => (
                    <CreateRigFieldDate
                        key={getRigDateKey(props.rig, date)}
                        rig={props.rig}
                        date={date}
                        bladeTaskHolder={props.BladeTaskHolder}
                        setDragging={props.setDragging}
                    />
                ) // Create a date for each day in the month
            )}
            {props.BladeTaskCards}{" "}
            {/*automatically spreads out the entries of BladeTaskCards */}
        </div>
    );
}
export default CreateRigFieldContainer;

function getRigDateKey(rig: string, date: Date) {
    return `${rig}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
