import { DndContext } from "@dnd-kit/core";
import "./Display.css";
import CreateTestRigDivs from "./TestRigDivs";
import CreateTimelineField from "./TimelineField";
import React, { useState } from "react";
import CreateAdditionalContent from "./AdditionalContent";
import BladeTaskCard from "./BladeTaskCard";
import { useQuery } from "@apollo/client";
import { GET_BT_IN_RANGE } from "../../api/queryList";
import { getMonthLength } from "./TimelineField";
import { capitalizeFirstLetter } from "./TimelineField";

const currentDate = new Date(Date.now()); // Get the current date

type DisplayProps = {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowPasswordPrompt: React.Dispatch<React.SetStateAction<boolean>>;
};

function DisplayComponent(props: DisplayProps) {
    const [rigs, setRigs] = useState([
        // should be imported from database
        {
            rigName: "Rig 1",
            rigNumber: 1,
        },
        {
            rigName: "Rig 2",
            rigNumber: 2,
        },
        {
            rigName: "Rig 3",
            rigNumber: 3,
        },
        {
            rigName: "Rig 4",
            rigNumber: 4,
        },
        {
            rigName: "Rig 5",
            rigNumber: 5,
        },
        {
            rigName: "Rig 6",
            rigNumber: 6
        }
    ]);

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
        if (!props.editMode) {
            // If switching to edit mode, show password prompt
            props.setShowPasswordPrompt(true);
        } else {
            // If switching from edit mode, just toggle the edit mode
            props.setEditMode(!props.editMode);
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

    const { loading, error, data } = useQuery(GET_BT_IN_RANGE, {
        variables: {
            startDate: queryDates.startDate,
            endDate: queryDates.endDate,
        },
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error {error.message}</p>;
    }
    let btCards: React.ReactNode[] = [];
    
    data["AllBladeTasks"].forEach((bt: any) => {
        
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
                key={bt.id} //BTCards skal have et unikt key for at fungere godt i react
                duration={bt.duration} //måske vi skal overveje at lave dem på en anden måde
                projectColor={`rgb(${bt.id*2}, ${bt.id/2}, 0, 70)`} //skal ændres
                taskName={bt.taskName}
                startDate={new Date(year, month, day)}
                endDate={new Date(endYear, endMonth, endDate)}
                rig={bt.testRig}
                id={bt.id}
            />
        );
    });

    return (
        <div className="ScheduleContentContainer">
            <div className="ScheduleViewControl">
                <form onSubmit={(e) => e.preventDefault()}>
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
                    <input type="number" min="2" max="24"onChange={handleNumberChange} />
                    <input type="button" onClick={goTo} value={"Go To"} />
                </form>
            </div>
            <div className="ScheduleFilterAndMode">
                <label>Filter:</label>
                <select name="customerFilter" id="customerFilter">
                    <option value="None">None</option>
                    <option value="Customer 1">Customer 1</option>
                    <option value="Customer 2">Customer 2</option>
                </select>
                <label className="switch"> Edit Mode</label>
                <input type="checkbox" onChange={handleModeChange} />
            </div>
            <div className="ScheduleDisplay">
                <CreateTestRigDivs rigs={rigs} />
                <DndContext>
                    <CreateTimelineField
                        rigs={rigs}
                        months={dates}
                        btCards={btCards}
                    />
                </DndContext>
            </div>
            {props.editMode ? <CreateAdditionalContent /> : null}
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

function getMonthsInView(startDate: Date, numberOfMonths: number) {
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
    console.log("start and end date ", startDate, endDate)
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
