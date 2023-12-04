import CreateRigFieldDate from "./RigFieldDate";
import React from "react";
import BladeTaskCard from "./BladeTaskCard";

export const rigFieldHeight = 50;

type RigFieldContainerProps = {
    rig: string;
    rigNumber: number;
    allDates: Date[];
    viewMonths: Date[];
    fieldWidth: number;
    columns: string; // The columns of the schedule
    BladeTaskCards: React.ReactNode[];
};

function CreateRigFieldContainer(props: RigFieldContainerProps) {
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
    props.BladeTaskCards.forEach((bladeTask) => {
        if (
            (bladeTask as React.ReactElement<any>).props.startDate >=
                props.viewMonths[0] &&
            (bladeTask as React.ReactElement<any>).props.startDate <=
                props.viewMonths[props.viewMonths.length - 1]
        ) {
            BTsStartInView.push(bladeTask); // Add the BladeTaskCard to the array if the startDate is in the view
        } else if (
            (bladeTask as React.ReactElement<any>).props.endDate >=
                props.viewMonths[0] &&
            (bladeTask as React.ReactElement<any>).props.endDate <=
                props.viewMonths[props.viewMonths.length - 1]
        ) {
            BTsEndInView.push(bladeTask); // Add the BladeTaskCard to the array if the endDate is in the view
        }
    });

    let renderEndInView: React.ReactNode[] = []; // place holder for the BladeTaskCards that end in the view
    BTsEndInView.forEach((bladeTask) => {
        renderEndInView.push( // Add the BladeTaskCard to the array if the endDate is in the view
            <BladeTaskCard
                key={(bladeTask as React.ReactElement<any>).props.id + 11111111}
                id={(bladeTask as React.ReactElement<any>).props.id}
                rig={(bladeTask as React.ReactElement<any>).props.rig}
                startDate={props.viewMonths[0]}
                endDate={(bladeTask as React.ReactElement<any>).props.endDate}
                duration={
                    (
                        bladeTask as React.ReactElement<any>
                    ).props.endDate.getDate() - 1
                }
                projectColor={
                    (bladeTask as React.ReactElement<any>).props.projectColor
                }
                projectId={
                    (bladeTask as React.ReactElement<any>).props.projectId
                }
                projectName={(bladeTask as React.ReactElement<any>).props.projectName}
                customer={(bladeTask as React.ReactElement<any>).props.customer}
                taskName={(bladeTask as React.ReactElement<any>).props.taskName}
                attachPeriod={
                    (bladeTask as React.ReactElement<any>).props.attachPeriod
                }
                detachPeriod={
                    (bladeTask as React.ReactElement<any>).props.detachPeriod
                }
            />
        );
    });

    return (
        <div
            key={props.rig}
            className="RigField"
            style={rigStyle}
            id="rigFieldContainerId"
        >
            {props.allDates.map(
                (date) => (
                    <CreateRigFieldDate
                        key={getRigDateKey(props.rig, date)}
                        rig={props.rig}
                        date={date}
                    />
                ) // Create a date for each day in the month
            )}
            {BTsStartInView}
            {renderEndInView}
            {/*automatically spreads out the entries of BladeTaskCards */}
        </div>
    );
}
export default CreateRigFieldContainer;

function getRigDateKey(rig: string, date: Date) {
    return `${rig}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
