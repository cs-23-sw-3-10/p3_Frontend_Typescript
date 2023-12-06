import { DndContext } from "@dnd-kit/core";
import { DragOverlay } from "@dnd-kit/core";
import CreateMonthDateContainer from "./MonthDateContainer";
import CreateRigFieldContainer from "./RigFieldContainer";
import MonthLengths from "./MonthLengthsEnum";
import React, { ReactEventHandler, useState } from "react";
import BladeTaskCard, { BladeTaskCardProps } from "./BladeTaskCard";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { useMutation } from "@apollo/client";
import { UPDATE_BT } from "../../api/mutationList";
import PendingTasks from "./PendingTasks";
import BladeTaskCardOverlay from "./BladeTaskCardOverlay";
import { createPortal } from "react-dom";

type TimelineFieldProps = {
    rigs: { rigName: string; rigNumber: number }[];
    months: Date[];
    btCards: React.ReactNode[];
    btCardsPending: React.ReactNode[];
    showPasswordPrompt?: boolean;
    isPendingTasksIncluded: boolean;
};

export const dateDivLength = 25; // px length of the dates in the schedule

function CreateTimelineField(props: TimelineFieldProps) {
    const [updateBt, { error, data }] = useMutation(UPDATE_BT);

    const [activeCard, setActiveCard] = useState<any>(null);
    const [scrollTranslation, setScrollTranslation] = useState<number>(0);

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
        gridTemplateRows: "30px 30px auto auto",
    };

    const rigFieldContainerStyle = {
        gridColumn: "1/-1",
        gridRow: "3",
        height: props.rigs.length * 50 + "px", // The height of the container is the number of rigs times the height of each rig
        maxHeight: props.rigs.length * 50 + "px",
        minHeight: props.rigs.length * 50 + "px",
    };

    const [isDragging, setDragging] = useState(false);

    // Create a BladeTaskHolder object to store the blade tasks
    let bladeTasks = new BladeTaskHolder(props.btCards);
    // Create a BladeTaskHolder object to store the pending blade tasks
    let bladeTasksPending = new BladeTaskHolder(props.btCardsPending);

    const handleScroll: ReactEventHandler<HTMLDivElement> = (event) => {
        const { scrollLeft} = event.currentTarget;
        setScrollTranslation(scrollLeft);
      };

    return (
        <div className="TimelineFieldContainer" onScroll={handleScroll}>
            <DndContext // DndContext is used to enable drag and drop functionality
                onDragStart={(event) => {
                    handleDragStart(event, setDragging, setActiveCard);
                }}
                onDragEnd={(event) => {
                    handleDragEnd(event, bladeTasks, bladeTasksPending, setDragging, updateBt);
                }}
            >
                <div className="TimelineField" style={BTFieldStyle}>
                    {props.months.map((month) => (
                        <CreateMonthDateContainer key={getMonthContainerKey(month)} currentMonth={month} />
                    ))}

                    <div className="RigFieldContainer" style={rigFieldContainerStyle}>
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
                                BladeTaskCards={bladeTasks.getBladeTasks().filter((bladeTask: React.ReactNode) => {
                                    //Finds the blade tasks placed on the rig
                                    if (bladeTask) {
                                        return (bladeTask as React.ReactElement<any>).props.rig === rig.rigNumber;
                                    }
                                    return false;
                                })}
                            />
                        ))}
                    </div>
                    {props.isPendingTasksIncluded && (
                    <PendingTasks
                        bladeTaskHolder={bladeTasksPending}
                        bladeTaskCards={bladeTasksPending.getBladeTasks()}
                        numberOfRigs={props.rigs.length}
                        showPasswordPrompt={props.showPasswordPrompt}
                        transformStyle={{transform: `translateX(${scrollTranslation}px)`}}
                    />
                )}
                
                {createPortal(
                    <DragOverlay>
                        {activeCard && console.log("Drag overlay created for:", activeCard)}
                        {activeCard && console.log("Drag overlay color", activeCard.duration)}

                        {activeCard && (
                            <BladeTaskCardOverlay
                                duration={activeCard.duration}
                                attachPeriod={activeCard.attachPeriod}
                                detachPeriod={activeCard.detachPeriod}
                                projectColor={activeCard.projectColor}
                                projectName={activeCard.projectName}
                                projectId={activeCard.projectId}
                                customer={activeCard.customer}
                                taskName={activeCard.taskName}
                                id={activeCard.id}
                                shown={activeCard.shown}
                                enableDraggable={activeCard.enableDraggable}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
                </div>
            </DndContext>
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
    setDragging: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveCard: React.Dispatch<React.SetStateAction<BladeTaskCardProps | null>>
) {
    const { active } = event;
    if (active !== null) {
        setDragging(true);
    }

    if (event.active.data.current.type === "BladeTaskCardProps") {
        setActiveCard(event.active.data.current.props);
    }
}

export function handleDragEnd(
    event: any,
    bladeTaskHolder: BladeTaskHolder,
    bladeTaskHolderPending: BladeTaskHolder,
    setDragging: React.Dispatch<React.SetStateAction<boolean>>,
    updateBT: Function
) {
    const { active, over } = event; // active is the element being dragged, over is the element being dragged over
    const updatedBladeTaskCards = bladeTaskHolder.getBladeTasks(); // Get the blade tasks from the BladeTaskHolder
    const updatedBladeTaskCardsPending = bladeTaskHolderPending.getBladeTasks(); // Get the pending blade tasks from the BladeTaskHolder

    const { statusBT, indexBT } = findBTIndex(
        // Find the index of the blade task being dragged
        updatedBladeTaskCards,
        updatedBladeTaskCardsPending,
        active
    );

    let draggedCard: React.ReactElement;

    if (over !== null && indexBT !== -1) {
        //get dragged card
        if (statusBT === "scheduled") {
            // If the blade task is scheduled, get the blade task from the scheduled blade tasks
            draggedCard = updatedBladeTaskCards[indexBT] as React.ReactElement;
        } else {
            // Else, get the blade task from the pending blade tasks
            draggedCard = updatedBladeTaskCardsPending[indexBT] as React.ReactElement;
        }

        //Moving to pending tasks
        if (over.id === "droppablePendingTasksId") {
            if (statusBT === "scheduled") {
                updateBT({
                    //update blade task in database
                    variables: {
                        id: draggedCard.props.id,
                        startDate: "undefined",
                        duration: draggedCard.props.duration,
                        rig: 0,
                    },
                });

                updatedBladeTaskCards.splice(indexBT, 1);

                updatedBladeTaskCardsPending.push(
                    // Add the blade task to the pending blade tasks
                    <BladeTaskCard
                        key={draggedCard.key}
                        id={draggedCard.props.id}
                        duration={draggedCard.props.duration}
                        attachPeriod={draggedCard.props.attachPeriod}
                        detachPeriod={draggedCard.props.detachPeriod}
                        projectColor={draggedCard.props.projectColor}
                        projectId={draggedCard.props.projectId}
                        customer={draggedCard.props.customer}
                        taskName={draggedCard.props.taskName}
                        shown={draggedCard.props.shown}
                        startDate={undefined}
                        endDate={undefined}
                        rig={undefined}
                    />
                );

                bladeTaskHolder.setBladeTasks(updatedBladeTaskCards); // Update the blade tasks in the BladeTaskHolder
                bladeTaskHolderPending.setBladeTasks(
                    // Update the pending blade tasks in the BladeTaskHolder
                    updatedBladeTaskCardsPending
                );
            } else {
                console.log("a pending BT was moved to pending");
            }
        } else {
            const overIdSlpit = over.id.split("-");
            const overRig = parseInt(overIdSlpit[0].split(" ")[1]); // Get the rig number of the column being dragged over
            const overDate = new Date(overIdSlpit[1], overIdSlpit[2], overIdSlpit[3]); // Get the date of the column being dragged over

            // Check for overlap before updating the cards
            const isOverlap = checkForOverlap(draggedCard, updatedBladeTaskCards, indexBT, overDate, overRig);

            if (!isOverlap) {
                let newEndDate = new Date(overDate);

                newEndDate.setDate(
                    // Set the end date of the blade task
                    newEndDate.getDate() + draggedCard.props.duration - 1
                );

                updateBT({
                    //update blade task in database
                    variables: {
                        id: draggedCard.props.id,
                        startDate: formatDate(overDate),
                        duration: draggedCard.props.duration,
                        rig: overRig,
                    },
                });

                if (statusBT === "scheduled") {
                    updatedBladeTaskCards[indexBT] = // Update the blade task in the scheduled blade tasks
                        (
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

                    bladeTaskHolder.setBladeTasks(updatedBladeTaskCards); // Update the scheduled blade tasks in the BladeTaskHolder
                } else {
                    updatedBladeTaskCardsPending.splice(indexBT, 1);

                    updatedBladeTaskCards.push(
                        // Add the blade task to the scheduled blade tasks
                        <BladeTaskCard
                            key={draggedCard.key}
                            id={draggedCard.props.id}
                            duration={draggedCard.props.duration}
                            projectColor={draggedCard.props.projectColor}
                            projectId={draggedCard.props.projectId}
                            customer={draggedCard.props.customer}
                            taskName={draggedCard.props.taskName}
                            shown={draggedCard.props.shown}
                            startDate={new Date(overDate)}
                            endDate={newEndDate}
                            attachPeriod={draggedCard.props.attachPeriod}
                            detachPeriod={draggedCard.props.detachPeriod}
                            enableDraggable={draggedCard.props.enableDraggable}
                            rig={overRig}
                        />
                    );

                    bladeTaskHolder.setBladeTasks(updatedBladeTaskCards); // Update the scheduled blade tasks in the BladeTaskHolder
                    bladeTaskHolderPending.setBladeTasks(
                        // Update the pending blade tasks in the BladeTaskHolder
                        updatedBladeTaskCardsPending
                    );
                }
            } else {
                console.log("Overlap detected. drag opreation cancelled");
            }
            setDragging(false);
        }
    } else {
        console.log("over is null");
    }
}

export function findBTIndex(bladeTaskCards: any, bladeTaskCardsPending: any, activeComponent: any) {
    for (let i: number = 0; i < bladeTaskCards.length; i++) {
        if (bladeTaskCards[i] && activeComponent.id === bladeTaskCards[i].props.id) {
            return { statusBT: "scheduled", indexBT: i };
        }
    }
    for (let i: number = 0; i < bladeTaskCardsPending.length; i++) {
        if (bladeTaskCardsPending[i] && activeComponent.id === bladeTaskCardsPending[i].props.id) {
            return { statusBT: "pending", indexBT: i };
        }
    }
    console.log("blade task not found");
    return { statusBT: "not found", indexBT: -1 };
}

function checkForOverlap(draggedCard: any, bladeTaskCards: any, BTIndex: number, newStartDate: Date, overRig: number) {
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
            if (bladeTaskCards[i].props.rig === overRig || bladeTaskCards[i].props.projectId === draggedCard.props.projectId) {
                // skip comparison with cards on different rigs unless it is from same project
                //Overlaps are covered by two cases. A check is made for each case.
                if (startDateA <= startDateB) {
                    if (!(endDateA < startDateB)) {
                        return true;
                    }
                } else if (startDateB < startDateA) {
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
