import CreateMonthDateContainer from "./MonthDateContainer";
import CreateRigFieldContainer from "./RigFieldContainer";
import MonthLengths from "./MonthLengthsEnum";
import React, { Dispatch,  SetStateAction, useState, } from "react";
import  { BladeTaskCardProps } from "./BladeTaskCard";
import { BladeTaskHolder } from "./BladeTaskHolder";
import PendingTasks from "./PendingTasks";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import BladeTaskCardOverlay from "./BladeTaskCardOverlay";
import { handleDragEnd, handleDragStart } from "./Display";
import { UPDATE_BT } from "../../api/mutationList";
import { useMutation } from "@apollo/client";

type TimelineFieldProps = {
    rigs: { rigName: string; rigNumber: number }[];
    months: Date[];
    btCards: React.ReactNode[];
    showPasswordPrompt?: boolean;
    //setActiveCard?: Dispatch<SetStateAction<BladeTaskCardProps | null>>,
    //isDragging: boolean,
    //setDragging?: Dispatch<SetStateAction<boolean>> | undefined
};

export const dateDivLength = 25; // px length of the dates in the schedule

function CreateTimelineField(props: TimelineFieldProps) {    
    let fieldWidth: number = 0; // px width of the field dynamically calculated from the number of months displayed
    props.months.forEach((month) => {
        fieldWidth += getTotalWidth(
            capitalizeFirstLetter(
                month.toLocaleString("default", { month: "long" }) // Get the month name
            ),
            month.getFullYear()
        );
    });

  
    
    const [isDragging, setDragging] = useState(false);



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

 


    // Create a BladeTaskHolder object to store the blade tasks
    let bladeTasks = new BladeTaskHolder(props.btCards);
    return (
        <div className="TimelineFieldContainer">

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


