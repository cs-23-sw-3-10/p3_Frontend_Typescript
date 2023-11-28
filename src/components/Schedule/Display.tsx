import "./Display.css";
import CreateTestRigDivs from "./TestRigDivs";
import CreateTimelineField from "./TimelineField";
import React, { useState} from "react";
import CreateAdditionalContent from "./AdditionalContent";
import BladeTaskCard from "./BladeTaskCard";
import { useQuery } from "@apollo/client";
import { GET_BT_IN_RANGE_AND_PENDING, GET_TEST_RIGS } from "../../api/queryList";
import { getMonthLength } from "./TimelineField";
import { capitalizeFirstLetter } from "./TimelineField";
import { useEditModeContext } from "../../EditModeContext";

const currentDate = new Date(Date.now()); // Get the current date

type DisplayProps = {
    setShowPasswordPrompt: React.Dispatch<React.SetStateAction<boolean>>;
    showPasswordPrompt: boolean;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
};

function DisplayComponent(props: DisplayProps) {
    const editMode = useEditModeContext();
    const [rigs, setRigs] = useState<{rigName: string, rigNumber: number}[]>([{rigName: "No Rigs", rigNumber: 0}]);

    const [selectedDate, setSelectedDate] = useState(
        `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()}`
    ); // State to store the selected date
    const [numberOfMonths, setNumberOfMonths] = useState(3); // State to store the number of months to display

    const [dates, setDates] = useState(
        getMonthsInView(currentDate, numberOfMonths)
    ); // should be imported from database
    

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let number = parseInt(event.target.value);
        if (number < 2) {
            number = 2;
        } else if (number > 24) {
            number = 24;
        }
        setNumberOfMonths(number);
    };

    const handleModeChange = () => {
        if (!editMode.isEditMode) {
            // If switching to edit mode, show password prompt
            props.setShowPasswordPrompt(true);
        } else {
            // If switching from edit mode, just toggle the edit mode
            editMode.setEditMode(!editMode.isEditMode);
        }
    };

    const goTo = () => {
        const newDate = new Date(selectedDate);
        if (!isNaN(newDate.valueOf())) {
            setDates(getMonthsInView(newDate, numberOfMonths));
        } else {
            setDates(getMonthsInView(currentDate, numberOfMonths));
        }
    };

    const queryDates = getQueryDates(dates[0], dates[dates.length - 1]);

    const {
        loading: loadingRigs,
        error: errorRigs,
        data: dataRigs,
    } = useQuery(GET_TEST_RIGS);
    

    const { loading: loadingBT, error: errorBT, data: dataBT } = useQuery(GET_BT_IN_RANGE_AND_PENDING, {
        variables: {
            startDate: queryDates.startDate,
            endDate: queryDates.endDate,
            isActive: !editMode.isEditMode,
        },
    });

    if (loadingRigs) {
        return <p>Loading...</p>;
    }
    if (errorRigs) {
        return <p>Error {errorRigs.message}</p>;
    }

    if (loadingBT) {
        return <p>Loading...</p>;
    }
    if (errorBT) {
        return <p>Error {errorBT.message}</p>;
    }

    const numberOfRigs = parseInt(dataRigs.DictionaryAllByCategory[0].label);
    if (rigs.length !== numberOfRigs){
        setRigs(createRigs(numberOfRigs));
    }

    //Makeing schedulet BladeTaskCards
    let btCards: React.ReactNode[] = [];

    dataBT["AllBladeTasksInRange"].forEach((bt: any) => {
        let btShown = false;
        if (
            bt.bladeProject.customer === props.filter ||
            props.filter === "None"
        ) {
            btShown = true;
        }
        let dateSplit = bt.startDate.split("-");
        const year = parseInt(dateSplit[0]);
        const month = parseInt(dateSplit[1]) - 1;
        const day = parseInt(dateSplit[2]);

            let endDateSplit = bt.endDate.split("-");
            const endYear = parseInt(endDateSplit[0]);
            const endMonth = parseInt(endDateSplit[1]) - 1;
            const endDate = parseInt(endDateSplit[2]);
            btCards.push(
                <BladeTaskCard
                    key={bt.id}
                    duration={bt.duration}
                    projectColor={bt.bladeProject.color}
                    projectId={bt.bladeProject.id}
                    projectName={bt.bladeProject.projectName}
                    customer={bt.bladeProject.customer}
                    taskName={bt.taskName}
                    startDate={new Date(year, month, day)}
                    endDate={new Date(endYear, endMonth, endDate)}
                    attachPeriod={bt.attachPeriod}
                    detachPeriod={bt.detachPeriod}
                    rig={bt.testRig}
                    id={bt.id}
                    shown={btShown}
                    enableDraggable={!editMode.isEditMode}
                    inConflict={bt.inConflict}
                                    />
            );
    });



    //Making pending BladeTaskCards
    let btCardsPending: React.ReactNode[] = [];
    dataBT["AllBladeTasksPending"].forEach((bt: any) => {
        let btShown = false;
        if (
            bt.bladeProject.customer === props.filter ||
            props.filter === "None"
        ) {
            btShown = true;
        }

        btCardsPending.push(
            <BladeTaskCard
                key={bt.id}
                duration={bt.duration}
                attachPeriod={bt.attachPeriod}
                detachPeriod={bt.detachPeriod}
                projectColor={bt.bladeProject.color}
                projectId={bt.bladeProject.id}
                projectName={bt.bladeProject.projectName}
                customer={bt.bladeProject.customer}
                taskName={bt.taskName}
                id={bt.id}
                shown={btShown}
                enableDraggable={!editMode.isEditMode}
                inConflict={false}
            />
        );
    });

    return (
        <div className="ScheduleContentContainer">
            <div className="ScheduleViewControl">
                <form onSubmit={(e) => {e.preventDefault(); goTo()}}>
                    <label htmlFor="dateInput" style={{ fontSize: "10px" }}>
                        Date:
                    </label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <label htmlFor="numberInput" style={{ fontSize: "10px" }}>
                        Months shown:
                    </label>
                    <input
                        type="number"
                        min="2"
                        max="24"
                        onChange={handleNumberChange}
                    />
                    <input type="submit" onClick={goTo} value={"Go To"} />
                </form>
            </div>
            {editMode.isEditMode ? (
            <div className="ScheduleFilterAndMode">
                <label className="switch"> Edit Mode</label>
                <input type="checkbox" checked={true} onChange={handleModeChange} />
            </div>
            ) : (
            <div className="ScheduleFilterAndMode">
                <label>Filter:</label>
                <select
                    name="customerFilter"
                    id="customerFilter"
                    onChange={(e) => {
                        props.setFilter(e.target.value);
                    }}
                >
                    <option value="None">None</option>
                    <option value="Goldwind">Goldwind</option>
                    <option value="Suzlon">Suzlon</option>
                </select>
                <label className="switch"> Edit Mode</label>
                <input type="checkbox" checked={false} onChange={handleModeChange} />
            </div>
            )}
            
            <div className="ScheduleDisplay">
                <CreateTestRigDivs rigs={rigs} />
                <CreateTimelineField
                    rigs={rigs}
                    months={dates}
                    btCards={btCards}
                    btCardsPending={btCardsPending}
                    showPasswordPrompt={props.showPasswordPrompt}
                    isPendingTasksIncluded={true}
                />
            </div>


            {editMode.isEditMode ? <CreateAdditionalContent /> : null}

        </div>
    );
}
export default DisplayComponent;

function convertToQueryDate(year: number, month: number, day: number) {
    let queryDateSTR = year.toString() + "-";
    let queryMonth = month + 1;
    if (queryMonth < 10) {
        queryDateSTR += "0" + queryMonth.toString() + "-";
    } else {
        queryDateSTR += queryMonth.toString() + "-";
    }
    if (day < 10) {
        queryDateSTR += "0" + day.toString();
    } else {
        queryDateSTR += day.toString();
    }
    return queryDateSTR;
}

export function getMonthsInView(startDate: Date, numberOfMonths: number) {
    let year = startDate.getFullYear();
    let month = startDate.getMonth();
    let viewMonths: Date[] = [new Date(year, month, 1)];

    if (!isNaN(startDate.valueOf())) {
        for (let i = 1; i < numberOfMonths; i++) {
            let newDate = new Date(year, month + i);
            let lastDay = getMonthLength(
                capitalizeFirstLetter(
                    newDate.toLocaleString("default", { month: "long" })
                ),
                startDate.getFullYear()
            );
            viewMonths.push(new Date(year, month + i, lastDay));
        }
    } else {
        if (numberOfMonths < 1) {
            viewMonths = [];
            return viewMonths;
        }
        viewMonths = getMonthsInView(currentDate, numberOfMonths - 1);
    }
    return viewMonths;
}

function getQueryDates(startDate: Date, endDate: Date) {
    let startDateSTR: String;
    let endDateSTR: String;
    let startDateDay = startDate.getDate();
    let endDateDay = endDate.getDate();

    if (startDate === endDate) {
        let monthLength = getMonthLength(
            capitalizeFirstLetter(
                startDate.toLocaleString("default", { month: "long" })
            ),
            startDate.getFullYear()
        );
        endDateDay = monthLength;
    }

    startDateSTR = convertToQueryDate(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDateDay
    );
    endDateSTR = convertToQueryDate(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDateDay
    );
    return { startDate: startDateSTR, endDate: endDateSTR };
}

function createRigs(numberOfRigs: number) {
    let rigs: {rigName: string, rigNumber: number}[]= [];
    for (let i = 1; i <= numberOfRigs; i++) {
        rigs.push({
            rigName: "Rig " + (i).toString(),
            rigNumber: i,
        });
    }
    return rigs;
}