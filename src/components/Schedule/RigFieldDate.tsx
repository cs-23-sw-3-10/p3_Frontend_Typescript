import { DndContext, useDroppable } from "@dnd-kit/core";
import { BladeTaskHolder } from "./BladeTaskHolder";

interface RigFieldDateDroppableProps {
    className: "RigFieldDate";
    id: string;
    rig: string;
    date: Date;
    style: RigFieldDateStyle;
    bladeTaskHolder: BladeTaskHolder;
    setDragging: any;
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
    setDragging: any;
};

function CreateRigFieldDate(props: RigFieldDateProps) {
    let year = props.date.getFullYear();
    let monthNumber = props.date.getMonth();
    let dateNumber = props.date.getDate();
    let weekDay = props.date.getDay(); // 0 = Sunday, 6 = Saturday to gray out weekends
    let idSTR = `${props.rig}-${year}-${monthNumber}-${dateNumber}`; // id for the date div

    const dateStyle: RigFieldDateStyle = {
        gridColumn: `date-${year}-${monthNumber}-${dateNumber}`,
        gridRow: "1",
        backgroundColor: weekDay === 0 || weekDay === 6 ? "lightgrey" : "white", // Default color
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
    let idSTR = `${props.id}-droppable`
    const { setNodeRef } = useDroppable({
        id: idSTR,
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
