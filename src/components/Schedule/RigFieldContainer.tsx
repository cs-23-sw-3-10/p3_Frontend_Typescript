import { DndContext } from "@dnd-kit/core";
import CreateRigFieldDate from "./RigFieldDate";
import React, { useState } from "react";
import BladeTaskCard from "./BladeTaskCard";

type RigFieldContainerProps = {
    rig: string;
    allDates: Date[];
    fieldWidth: number;
    columns: string; // The columns of the schedule
    allBladeTaskCards: React.ReactNode[];
    BladeTaskCards: React.ReactNode[];
    setter: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
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
                handleDragEnd(event, props.allBladeTaskCards, props.setter);
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
    bladeTaskCards: React.ReactNode[],
    setBladeTaskCards: React.Dispatch<React.SetStateAction<React.ReactNode[]>>
) {
    console.log("drag ended");
    const { active, over } = event;
    if (over !== null) {
        const overIdSlpit = over.id.split("-");
        const overRig = overIdSlpit[0];
        const overDate = new Date(overIdSlpit[1], overIdSlpit[2], overIdSlpit[3]);
        console.log("overDate: ", overDate);
        const findBTIndex = (bladeTaskCards: any) => {
            for(let i: number = 0; i < bladeTaskCards.length; i++) {
                if (active.id === bladeTaskCards[i].props.id) {
                    return i;
                }
            }
            return -1;
        };
        const indexBT = findBTIndex(bladeTaskCards);

        if (indexBT !== -1) {
            console.log("indexBT: " + indexBT);
            setBladeTaskCards((prevBladeTaskCards) => {
                const updatedBladeTaskCards = [...prevBladeTaskCards];
                const draggedCard = updatedBladeTaskCards[indexBT] as React.ReactElement;
                console.log("over.date: ", over);
                console.log("draggedCard: ", draggedCard);
                console.log("draggedCard.props: ", draggedCard.props);
                updatedBladeTaskCards[indexBT] = 
                <BladeTaskCard 
                    key={draggedCard.key}
                    id={draggedCard.props.id}
                    duration={draggedCard.props.duration}
                    projectColor={draggedCard.props.projectColor}
                    taskName={draggedCard.props.taskName}
                    startDate={overDate}
                    rig={overRig}
                    />;
                return updatedBladeTaskCards;
            });
        }
    } else {
        console.log("over er null");
    }
}

function getRigDateKey(rig: string, date: Date) {
    return `${rig}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
