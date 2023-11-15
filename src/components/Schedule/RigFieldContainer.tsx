import { DndContext } from "@dnd-kit/core";
import CreateRigFieldDate from "./RigFieldDate";

type RigFieldContainerProps = {
    rig: string;
    allDates: Date[];
    fieldWidth: number;
    columns: string; // The columns of the schedule
    BladeTaskCards: React.ReactNode[];
};

function CreateRigFieldContainer(props: RigFieldContainerProps) {
    const rigStyle = {
        width: `${props.fieldWidth}px`,
        gridTemplateColumns: props.columns, // The righas columns corresponding to the schedule
        gridTemplateRows: "auto",
    };
    return (
        <DndContext
            key={props.rig}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div key={props.rig} className="RigField" style={rigStyle}>
                {props.allDates.map(
                    (date) => (
                        <CreateRigFieldDate
                            key={getRigDateKey(props.rig, date)}
                            rig={props.rig}
                            date={date}
                        />
                    ) // Create a date for each day in the month
                )}
                {props.BladeTaskCards}{" "}
                {/*automatically spreads out the entries of BladeTaskCards */}
            </div>
        </DndContext>
    );
}
export default CreateRigFieldContainer;

export function handleDragStart(event: any) {
    const { active } = event;
    console.log("drag started");
    console.log(active.id);
}

export function handleDragEnd(event: any) {
    console.log("drag ended");
    const { active, over } = event;
    console.log(active.id);
    if (over !== null){
        console.log("her er over ", over.id);
    }
    else{
        console.log("over er null");
    }
}

function getRigDateKey(rig: string, date: Date) {
    return `${rig}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
