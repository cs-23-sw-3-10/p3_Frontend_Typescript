import { DndContext } from "@dnd-kit/core";
import "./Display.css";
import CreateTestRigDivs from "./TestRigDivs";
import CreateTimelineField from "./TimelineField";
import BladeTaskCard from "./BladeTaskCard";
import React, { useState } from "react";
import CreateAdditionalContent from "./AdditionalContent";
import { bladeTaskCards } from "./BladeTaskCard";

let date = new Date(Date.now());
const firstStartDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
);

type DisplayProps = {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowPasswordPrompt: React.Dispatch<React.SetStateAction<boolean>>;
};

function DisplayComponent(props: DisplayProps) {
    const [rigs, setRigs] = useState([
        // should be imported from database
        "Rig 1",
        "Rig 2",
        "Rig 3",
        "Rig 4",
        "Rig 5",
        "Rig 6",
    ]);

    const [btCards, setBladeTaskCards] = useState([
        ...bladeTaskCards
    ]);

    const [dates, setDates] = useState([
        new Date(firstStartDate),
        new Date(firstStartDate.getFullYear(), firstStartDate.getMonth() + 1),
        new Date(firstStartDate.getFullYear(), firstStartDate.getMonth() + 2),
    ]); // should be imported from database

    const [selectedDate, setSelectedDate] = useState(""); // State to store the selected date
    const [numberOfMonths, setNumberOfMonths] = useState(3); // State to store the number of months to display

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfMonths(parseInt(event.target.value));
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
            setDates(CreateDisplayMonths(newDate, numberOfMonths));
        } else {
            setDates(CreateDisplayMonths(newDate, numberOfMonths));
        }
    };

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
                    <input type="number" onChange={handleNumberChange} />
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
                        allBladeTaskCards={btCards}
                        setter={setBladeTaskCards}
                    />
                </DndContext>
            </div>
            {props.editMode ? <CreateAdditionalContent /> : null}
        </div>
    );
}
export default DisplayComponent;

function CreateDisplayMonths(startDate: Date, numberOfMonths: number) {
    let months: Date[] = [];
    if (!isNaN(startDate.valueOf())) {
        for (let i = 0; i < numberOfMonths; i++) {
            months.push(
                new Date(startDate.getFullYear(), startDate.getMonth() + i)
            );
        }
    } else {
        months = CreateDisplayMonths(firstStartDate, numberOfMonths);
    }
    return months;
}
