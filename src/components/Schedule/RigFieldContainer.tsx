import CreateRigFieldDate from "./RigFieldDate";
import React from "react";
import { BladeTaskHolder } from "./BladeTaskHolder";
import BladeTaskCard from "./BladeTaskCard";
import { getMonthLength, capitalizeFirstLetter } from "./TimelineField";
import { useEditModeContext } from "../../EditModeContext";

export const rigFieldHeight = 50;

type RigFieldContainerProps = {
    rig: string;
    rigNumber: number;
    allDates: Date[];
    viewMonths: Date[];
    fieldWidth: number;
    columns: string; // The columns of the schedule
    BladeTaskHolder: BladeTaskHolder;
    BladeTaskCards: React.ReactNode[];
    isDragging: boolean;
    setDragging: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

function CreateRigFieldContainer(props: RigFieldContainerProps) {
    const editMode = useEditModeContext();
    const rigStyle = {
        width: `${props.fieldWidth}px`,
        gridTemplateColumns: props.columns, // The rig has columns corresponding to the schedule
        gridTemplateRows: "auto",
        heigt: rigFieldHeight,
        minHeight: `${rigFieldHeight}px`,
        maxHeight: `${rigFieldHeight}px`,
    };
    let BTsStartInView: React.ReactNode[] = []; // BladeTaskCards that start in the view
    let BTsEndInView: React.ReactNode[] = []; // BladeTaskCards that end in the view
    let BTsLongerThanView: React.ReactNode[] = []; // BladeTaskCards that are longer than the view
    props.BladeTaskCards.forEach((bladeTask) => {
        if (
            (bladeTask as React.ReactElement<any>).props.startDate < props.viewMonths[0] &&
            (bladeTask as React.ReactElement<any>).props.endDate > props.viewMonths[props.viewMonths.length - 1]
        ) {
            BTsLongerThanView.push(bladeTask); // Add the BladeTaskCard to the array if the startDate is in the view
        }else if (
            (bladeTask as React.ReactElement<any>).props.startDate >= props.viewMonths[0] &&
            (bladeTask as React.ReactElement<any>).props.startDate <= props.viewMonths[props.viewMonths.length - 1]
        ) {
            BTsStartInView.push(bladeTask); // Add the BladeTaskCard to the array if the startDate is in the view
        } else if (
            (bladeTask as React.ReactElement<any>).props.endDate >= props.viewMonths[0] &&
            (bladeTask as React.ReactElement<any>).props.endDate <= props.viewMonths[props.viewMonths.length - 1]
        ) {
            BTsEndInView.push(bladeTask); // Add the BladeTaskCard to the array if the endDate is in the view
        }
        
    });

    BTsEndInView.forEach((bladeTask) => {
        BTsStartInView.push(
            // Add the BladeTaskCard to the array if the endDate is in the view
            <BladeTaskCard
                key={(bladeTask as React.ReactElement<any>).props.id}
                id={(bladeTask as React.ReactElement<any>).props.id}
                rig={(bladeTask as React.ReactElement<any>).props.rig}
                startDate={props.viewMonths[0]}
                endDate={(bladeTask as React.ReactElement<any>).props.endDate}
                duration={getDurationEndInView(bladeTask as React.ReactElement<any>, props.viewMonths)}
                projectColor={(bladeTask as React.ReactElement<any>).props.projectColor}
                projectId={(bladeTask as React.ReactElement<any>).props.projectId}
                customer={(bladeTask as React.ReactElement<any>).props.customer}
                taskName={(bladeTask as React.ReactElement<any>).props.taskName}
                attachPeriod={(bladeTask as React.ReactElement<any>).props.attachPeriod}
                detachPeriod={(bladeTask as React.ReactElement<any>).props.detachPeriod}
                shown={editMode ? true : false}
                enableDraggable={editMode ? true : false}
            />
        );
    });
    BTsLongerThanView.forEach((bladeTask) => {
        BTsStartInView.push(
            <BladeTaskCard
                key={(bladeTask as React.ReactElement<any>).props.id}
                id={(bladeTask as React.ReactElement<any>).props.id}
                rig={(bladeTask as React.ReactElement<any>).props.rig}
                startDate={new Date(props.viewMonths[0].getFullYear(), props.viewMonths[0].getMonth(), 1)}
                endDate={props.viewMonths[props.viewMonths.length - 1]}
                duration={getDurationWhenLongerThanView(props.viewMonths)}
                projectColor={(bladeTask as React.ReactElement<any>).props.projectColor}
                projectId={(bladeTask as React.ReactElement<any>).props.projectId}
                customer={(bladeTask as React.ReactElement<any>).props.customer}
                taskName={(bladeTask as React.ReactElement<any>).props.taskName}
                attachPeriod={(bladeTask as React.ReactElement<any>).props.attachPeriod}
                detachPeriod={(bladeTask as React.ReactElement<any>).props.detachPeriod}
                shown={editMode ? true : false}
                enableDraggable={editMode ? true : false}
            />
        );
    });

    return (
        <div key={props.rig} className="RigField" style={rigStyle} id="rigFieldContainerId">
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
            {BTsStartInView}
            {/*automatically spreads out the entries of BladeTaskCards */}
        </div>
    );
}
export default CreateRigFieldContainer;

function getRigDateKey(rig: string, date: Date) {
    return `${rig}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function getDurationWhenLongerThanView(months: Date[]) {
    let duration = 0;
    months.forEach((month) => {
        duration += getMonthLength(capitalizeFirstLetter(
            month.toLocaleString("default", { month: "long" }) // Get the month name
        ), month.getFullYear());
    });
    return duration;
}

function getDurationEndInView(BT: React.ReactElement<any>, months: Date[]) {
    let duration = 0;
    let endDate = BT.props.endDate;
    let endYear = endDate.getFullYear();
    let endMonth = endDate.getMonth();
    let endDay = endDate.getDate();

    months.forEach((month) => {
        if (month.getFullYear() === endYear && month.getMonth() === endMonth) {
            duration += endDay;
        } else if (month > endDate) {
            duration += 0;
        } else {
            duration += getMonthLength(capitalizeFirstLetter(
                month.toLocaleString("default", { month: "long" }) // Get the month name
            ), month.getFullYear());
        }
    });

    return duration;
}