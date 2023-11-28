import { DndContext } from "@dnd-kit/core";
import CreateMonthDateContainer from "./MonthDateContainer";
import CreateRigFieldContainer from "./RigFieldContainer";
import MonthLengths from "./MonthLengthsEnum";
import React, { useState } from "react";
import BladeTaskCard from "./BladeTaskCard";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { useMutation } from "@apollo/client";
import { UPDATE_BT } from "../../api/mutationList";

type TimelineFieldProps = {
    rigs: { rigName: string; rigNumber: number }[];
    months: Date[];
    btCards: React.ReactNode[];
};

export const dateDivLength = 25; // px length of the dates in the schedule

function CreateTimelineField(props: TimelineFieldProps) {
    const [updateBt, { error, data }] = useMutation(UPDATE_BT);

    let fieldWidth: number = 0; // px width of the field dynamically calculated from the number of months displayed
    props.months.forEach((month) => {
        fieldWidth += getTotalWidth(
            capitalizeFirstLetter(
                month.toLocaleString("default", { month: "long" }) // Get the month name
            ),
            month.getFullYear()
        );
    });

    let allDates: Date[] = []; // All dates to be displayed in the schedule
    props.months.forEach((month) => {
        let monthName = capitalizeFirstLetter(
            month.toLocaleString("default", { month: "long" }) // Get the month name
        );
        for (
            // Create a date for each day in the month
            let i = 1;
            i <= getMonthLength(monthName, month.getFullYear());
            i++
        ) {
            let date = new Date(month.getFullYear(), month.getMonth(), i);
            allDates.push(date);
        }
    });

    const columnsOfSchedule = createGridColumns(allDates); // Create the grid columns for the schedule

    const BTFieldStyle = {
        // Style for the BladeTaskField
        width: `${fieldWidth}px`,
        gridTemplateColumns: columnsOfSchedule,
        gridTemplateRows: "30px 30px auto",
    };

    const rigFieldContainerStyle = {
        gridColumn: "1/-1",
        gridRow: "3",
        height: props.rigs.length * 50 + "px", // The height of the container is the number of rigs times the height of each rig
        maxHeight: props.rigs.length * 50 + "px",
        minHeight: props.rigs.length * 50 + "px",
    };

    const [isDragging, setDragging] = useState(false);

    let bladeTasks = new BladeTaskHolder(props.btCards);
    return (
        <div className="TimelineFieldContainer">
            <div className="TimelineField" style={BTFieldStyle}>
                {props.months.map((month) => (
                    <CreateMonthDateContainer
                        key={getMonthContainerKey(month)}
                        currentMonth={month}
                    />
                ))}
                <DndContext
                    onDragStart={(event) => {
                        handleDragStart(event, setDragging);
                    }}
                    onDragEnd={(event) => {
                        handleDragEnd(event, bladeTasks, setDragging, updateBt);
                    }}
                >
                    <div
                        className="RigFieldContainer"
                        style={rigFieldContainerStyle}
                    >
                        {props.rigs.map((rig) => (
                            // Create a rig field for each rig
                            <CreateRigFieldContainer
                                key={rig.rigName}
                                rig={rig.rigName}
                                rigNumber={rig.rigNumber}
                                viewMonths={props.months}
                                allDates={allDates}
                                fieldWidth={fieldWidth}
                                columns={columnsOfSchedule}
                                isDragging={isDragging}
                                setDragging={setDragging}
                                BladeTaskHolder={bladeTasks}
                                BladeTaskCards={bladeTasks
                                    .getBladeTasks()
                                    .filter((bladeTask: React.ReactNode) => {
                                        //Finds the blade tasks placed on the rig
                                        if (bladeTask) {
                                            return (
                                                (
                                                    bladeTask as React.ReactElement<any>
                                                ).props.rig === rig.rigNumber
                                            );
                                        }
                                        return false;
                                    })}
                            />
                        ))}
                    </div>
                </DndContext>
            </div>
        </div>
    );
}
export default CreateTimelineField;

export function getTotalWidth(month: string, year: number) {
    let totalWidth = dateDivLength * getMonthLength(month, year); // Get the total width of the month // The total width is the number of days in the month times the width of each date
    return totalWidth;
}

export function getMonthLength(month: string, year: number) {
    return month === "February" || month === "Februar" // Check if the month is February
        ? getDaysInFebruary(year) // If it is, get the number of days in February
        : MonthLengths[month as keyof typeof MonthLengths]; // Else, get the number of days in the month
}

export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize the first letter of a string
}

export function getDaysInFebruary(year: number): number {
    return isLeapYear(year) ? 29 : 28; // Return 29 if the year is a leap year, else return 28
}

export function isLeapYear(year: number): boolean {
    // Leap years are divisible by 4, but not divisible by 100 unless also divisible by 400
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function createGridColumns(allDates: Date[]) {
    let gridSTR = ""; // String to be used as grid-template-columns
    allDates.forEach((date) => {
        // Create a labeled column for each date
        gridSTR += `[date-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}]${dateDivLength}px `;
    });
    return gridSTR;
}

function getMonthContainerKey(month: Date) {
    return `month-${month.getFullYear()}-${month.getMonth()}-Container`;
}

export function handleDragStart(
    event: any,
    setDragging: React.Dispatch<React.SetStateAction<boolean>>
) {
    const { active } = event;
    console.log("drag started");
    if (active !== null) {
        setDragging(true);
    }
}

export function handleDragEnd(
    event: any,
    bladeTaskHolder: BladeTaskHolder,
    setDragging: React.Dispatch<React.SetStateAction<boolean>>,
    updateBT: Function
) {
    console.log("drag ended");

    const { active, over } = event;
    console.log(active);
    if (over !== null) {
        const overIdSlpit = over.id.split("-");
        const overRig = parseInt(overIdSlpit[0].split(" ")[1]);
        const overDate = new Date(
            overIdSlpit[1],
            overIdSlpit[2],
            overIdSlpit[3]
        );
        const findBTIndex = (bladeTaskCards: any) => {
            for (let i: number = 0; i < bladeTaskCards.length; i++) {
                if (
                    bladeTaskCards[i] &&
                    active.id === bladeTaskCards[i].props.id
                ) {
                    return i;
                }
            }
            console.log("blade task not found");
            return -1;
        };
        const indexBT = findBTIndex(bladeTaskHolder.getBladeTasks());

        if (indexBT !== -1) {
            const updatedBladeTaskCards = bladeTaskHolder.getBladeTasks();
            const draggedCard = updatedBladeTaskCards[
                indexBT
            ] as React.ReactElement;

            // Check for overlap before updating the cards
            const isOverlap = checkForOverlap(
                updatedBladeTaskCards,
                indexBT,
                overDate,
                overRig
            );

            if (!isOverlap) {
                let newEndDate = new Date(overDate);

                newEndDate.setDate(
                    newEndDate.getDate() + draggedCard.props.duration - 1
                );

                console.log(overDate);
                console.log(newEndDate);
                console.log(draggedCard.props.duration);

                updateBT({
                    variables: {
                        id: draggedCard.props.id,
                        startDate: formatDate(overDate),
                        duration: draggedCard.props.duration,
                        rig: overRig,
                    },
                });

                updatedBladeTaskCards[indexBT] = (
                    <BladeTaskCard
                        key={draggedCard.key}
                        id={draggedCard.props.id}
                        duration={draggedCard.props.duration}
                        projectColor={draggedCard.props.projectColor}
                        projectId={draggedCard.props.projectId}
                        customer={draggedCard.props.customer}
                        taskName={draggedCard.props.taskName}
                        startDate={new Date(overDate)}
                        endDate={newEndDate}
                        rig={overRig}
                        attachPeriod={draggedCard.props.attachPeriod}
                        detachPeriod={draggedCard.props.detachPeriod}
                        enableDraggable={draggedCard.props.enableDraggable}
                        shown={draggedCard.props.shown}
                    />
                );
                bladeTaskHolder.setBladeTasks(updatedBladeTaskCards);
            } else {
                console.log("Overlap detected. drag opreation cancelled");

                updatedBladeTaskCards[indexBT] = draggedCard;
                bladeTaskHolder.setBladeTasks(updatedBladeTaskCards);
            }
            setDragging(false);
        }
    } else {
        console.log("over is null");
    }
}

function checkForOverlap(
    bladeTaskCards: any,
    BTIndex: number,
    newStartDate: Date,
    overRig: number
) {
    const draggedCard = bladeTaskCards[BTIndex];
    //start-/end date for dragged card
    const startDateA = newStartDate;
    let endDateA = new Date(newStartDate);
    endDateA.setDate(endDateA.getDate() + draggedCard.props.duration - 1);

    for (let i: number = 0; i < bladeTaskCards.length; i++) {
        //start-/end date for i'th card
        const startDateB = bladeTaskCards[i].props.startDate;
        const endDateB = bladeTaskCards[i].props.endDate;

        if (i !== BTIndex) {
            //skip comparison with itself
            if (
                bladeTaskCards[i].props.rig === overRig ||
                bladeTaskCards[i].props.projectId ===
                    draggedCard.props.projectId
            ) {
                // skip comparison with cards on different rigs
                //Overlaps are covered by two cases. A check is made for each case.
                if (startDateA <= startDateB) {
                    if (!(endDateA < startDateB)) {
                        return true;
                    }
                } else if (startDateB <= startDateA) {
                    if (!(endDateB < startDateA)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function formatDate(date: Date) {
    const year = date.getFullYear();
    // getMonth() returns 0-11; add 1 to make it 1-12 and pad with '0' if needed
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    // getDate() returns 1-31; pad with '0' if needed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}
