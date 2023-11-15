import { DndContext, useDroppable } from "@dnd-kit/core";
import { handleDragEnd, handleDragStart } from "./RigFieldContainer";

interface RigFieldDateDroppableProps {
    className: "RigFieldDate";
    id: string;
    rig: string;
    date: Date;
    style: RigFieldDateStyle;
}

interface RigFieldDateStyle {
    gridColumn: string;
    gridRow: "1";
    backgroundColor: string;
}

type RigFieldDateProps = {
    rig: string;
    date: Date;
};

function CreateRigFieldDate(props: RigFieldDateProps) {
    let year = props.date.getFullYear();
    let monthNumber = props.date.getMonth();
    let dateNumber = props.date.getDate();
    let weekDay = props.date.getDay(); // 0 = Sunday, 6 = Saturday to gray out weekends
    let idSTR = `${props.rig}-${year}-${monthNumber}-${dateNumber}}`; // id for the date div

    let RigFieldDatesStyle = {
        // Style for the RigFieldDate
        gridColumn: `date-${year}-${monthNumber}-${dateNumber}`,
        gridRow: "1",
        backgroundColor: "white", // Default color
    };
    if (weekDay === 0 || weekDay === 6) {
        RigFieldDatesStyle.backgroundColor = "lightgrey"; // Gray out weekends
    }

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
    };

    return Droppable(dateProps);
}
export default CreateRigFieldDate;

function Droppable(props: RigFieldDateDroppableProps) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });

    return (
        <DndContext
            key={props.id}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div
                ref={setNodeRef}
                key={props.id}
                className="RigFieldDate"
                id={props.id}
                style={props.style}
            ></div>
        </DndContext>
    );
}
