import { DndContext } from "@dnd-kit/core";
import "./Display.css";
import CreateTestRigDivs from "./TestRigDivs";
import CreateTimelineField from "./TimelineField";
import React, { useState } from "react";
import CreateAdditionalContent from "./AdditionalContent";
import BladeTaskCard from "./BladeTaskCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_BT } from "../../api/queryList";

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
            rigNumber: 6,
        },
    ]);

    // const [btCards, setBladeTaskCards] = useState(getBladeTasks());

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

    const { loading, error, data } = useQuery(GET_ALL_BT);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error {error.message}</p>;
    }
    let btCards: React.ReactNode[] = [];
    console.log("bts hentet");
    data["AllBladeTasks"].forEach((bt: any) => {
        let startDateSplit = bt.startDate.split("-");
        const startYear = parseInt(startDateSplit[0]);
        const startMonth = parseInt(startDateSplit[1]) - 1;
        const startDay = parseInt(startDateSplit[2]);

        let endDateSplit = bt.endDate.split("-");
        const endYear = parseInt(endDateSplit[0]);
        const endMonth = parseInt(endDateSplit[1]) - 1;
        const endDay = parseInt(endDateSplit[2]) - 1;

        btCards.push(
            <BladeTaskCard
                key={bt.id} //BTCards skal have et unikt key for at fungere godt i react
                duration={bt.duration} //måske vi skal overveje at lave dem på en anden måde
                projectColor={`rgb(${bt.id * 2}, ${bt.id / 2}, 0, 70)`} //skal ændres
                taskName={bt.taskName}
                startDate={new Date(startYear, startMonth, startDay)}
                endDate={new Date(endYear, endMonth, endDay)}
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
                        btCards={btCards}
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
