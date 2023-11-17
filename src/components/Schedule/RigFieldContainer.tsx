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
    isDragging: boolean;
    setDragging: any;
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
            onDragStart={(event) => {
                handleDragStart(event, props.isDragging, props.setDragging);
            }}
            onDragEnd={(event) => {
                handleDragEnd(event, props.BladeTaskHolder, props.setDragging);
            }}
        >
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
        </DndContext>
    );
}
export default CreateRigFieldContainer;

export function handleDragStart(event: any, isDragging: boolean, setDragging: any) {
    const { active } = event;
    console.log("drag started");
    if (active !== null) {
        setDragging(true);
    }
    
}

export function handleDragEnd(
    event: any,
    bladeTaskHolder: BladeTaskHolder,
    setDragging: any
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
        console.log("active: " , active)
        const findBTIndex = (bladeTaskCards: any) => {
            for (let i: number = 0; i < bladeTaskCards.length; i++) {
                console.log(".props.id: ", bladeTaskCards[i].props.id)
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
            setDragging(false);
        }
    } else {
        console.log("over er null");
    }
}

function getRigDateKey(rig: string, date: Date) {
    return `${rig}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
