import { DndContext } from "@dnd-kit/core";
import CreateRigFieldDate from "./RigFieldDate";
import React, { useState } from "react";
import BladeTaskCard from "./BladeTaskCard";
import { BladeTaskHolder } from "./BladeTaskHolder";

type RigFieldContainerProps = {
    rig: string;
    allDates: Date[];
    fieldWidth: number;
    columns: string; // The columns of the schedule
    BladeTaskHolder: BladeTaskHolder;
    BladeTaskCards: React.ReactNode[];
    setter: any;
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
        <DndContext
            key={props.rig}
            onDragStart={handleDragStart}
            onDragEnd={(event) => {
                handleDragEnd(event, props.BladeTaskHolder, props.setter);
            }}
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
    // console.log(active.id);
}

export function handleDragEnd(
    event: any,
    bladeTaskHolder: BladeTaskHolder,
    update: any
) {
    console.log("drag ended");
    const { active, over } = event;
    if (over !== null) {
        const overIdSlpit = over.id.split("-");
        const overRig = overIdSlpit[0];
        const overDate = new Date(
            overIdSlpit[1],
            overIdSlpit[2],
            overIdSlpit[3]
        );
        const findBTIndex = (bladeTaskCards: any) => {
            for (let i: number = 0; i < bladeTaskCards.length; i++) {
                if (active.id === bladeTaskCards[i].props.id) {
                    return i;
                }
            }
            return -1;
        };
        const indexBT = findBTIndex(bladeTaskHolder.getBladeTasks());

        if (indexBT !== -1) {
            const updatedBladeTaskCards = bladeTaskHolder.getBladeTasks();
            const draggedCard = updatedBladeTaskCards[indexBT] as React.ReactElement;
            updatedBladeTaskCards[indexBT] = (
                <BladeTaskCard
                    key={draggedCard.key}
                    id={`${draggedCard.props.taskName}-${overRig}-${overDate}`}
                    duration={draggedCard.props.duration}
                    projectColor={draggedCard.props.projectColor}
                    taskName={draggedCard.props.taskName}
                    startDate={overDate}
                    rig={overRig}
                />
            );
            bladeTaskHolder.setBladeTasks(updatedBladeTaskCards);
            update((prev: boolean) => !prev);
        }
    } else {
        console.log("over er null");
    }
}

function getRigDateKey(rig: string, date: Date) {
    return `${rig}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
