import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import "./Display.css";
import CreateTestRigDivs from "./TestRigDivs";
import CreateTimelineField from "./TimelineField";

let date = new Date(Date.now());
const firstStartDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
);

function DisplayComponent(editMode: boolean ,setEditMode: React.Dispatch<React.SetStateAction<boolean>>, setShowPasswordPrompt: React.Dispatch<React.SetStateAction<boolean>>) {
    const [rigs, setRigs] = useState([
        // should be imported from database
        "Rig 1",
        "Rig 2",
        "Rig 3",
        "Rig 4",
        "Rig 5",
        "Rig 6",
    ]);

    const [dates, setDates] = useState([
        new Date(firstStartDate),
        new Date(firstStartDate.getFullYear(), firstStartDate.getMonth() + 1),
        new Date(firstStartDate.getFullYear(), firstStartDate.getMonth() + 2),
    ]); // should be imported from database

    const additionalContent = CreateAdditionalContent();

    const [selectedDate, setSelectedDate] = useState(""); // State to store the selected date
    const [numberOfMonths, setNumberOfMonths] = useState(3); // State to store the number of months to display
    

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        setNumberOfMonths(parseInt(event.target.value));
    };

    const handleModeChange = () => {
        if (!editMode) {
            // If switching to edit mode, show password prompt
            setShowPasswordPrompt(true);
          } else {
            // If switching from edit mode, just toggle the edit mode
            setEditMode(!editMode);
          }
    };

    

    const goTo = () => {
        const newDate = new Date(selectedDate);
        if (!isNaN(newDate.valueOf())) {
            setDates(createDisplayMonths(newDate, numberOfMonths));
        } else {
            console.log("Invalid date");
            setDates(createDisplayMonths(newDate, numberOfMonths));
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
                <input type="checkbox" onChange={handleModeChange}/>
            </div>
            <div className="ScheduleDisplay">
                {CreateTestRigDivs(rigs, dates, setDates)}
                <DndContext>{CreateTimelineField(rigs, dates)}</DndContext>
                <div className="ScheduleDisplaySpacer"></div>
            </div>
            {editMode ? additionalContent : null}
            
        </div>
    );
}
export default DisplayComponent;

function createDisplayMonths(startDate: Date, numberOfMonths: number) {
    let months: Date[] = [];
    if (!isNaN(startDate.valueOf())) {
        for (let i = 0; i < numberOfMonths; i++) {
            months.push(
                new Date(startDate.getFullYear(), startDate.getMonth() + i)
            );
        }
    } else {
        months = createDisplayMonths(firstStartDate, numberOfMonths);
    }
    return months;
}

function CreateAdditionalContent() {
    return (
        <div className="AdditionalContent">
            <h3>AdditionalContent</h3>
        </div>
    );
}