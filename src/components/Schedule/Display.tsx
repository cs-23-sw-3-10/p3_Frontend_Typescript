import "./Display.css";
import CreateTestRigDivs from "./TestRigDivs";
import CreateTimelineField from "./TimelineField";
import React, { useState } from "react";
import CreateAdditionalContent from "./AdditionalContent";
import BladeTaskCard from "./BladeTaskCard";
import { useQuery, useSubscription } from "@apollo/client";
import {
    GET_BT_IN_RANGE_SUB,
    GET_TEST_RIGS,
    GET_BT_PENDING_SUB,
    GET_ALL_BLADE_PROJECTS,
} from "../../api/queryList";
import { getMonthLength } from "./TimelineField";
import { capitalizeFirstLetter } from "./TimelineField";
import { useEditModeContext } from "../../EditModeContext";
import SwitchComponent from "../TableLogic/SwitchComponent";
import StyledButton from "../ui/styledButton";

const currentDate = new Date(Date.now()); // Get the current date

type DisplayProps = {
    setShowPasswordPrompt: React.Dispatch<React.SetStateAction<boolean>>;
    showPasswordPrompt: boolean;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
};

function DisplayComponent(props: DisplayProps) {
    const editMode = useEditModeContext();
    const [rigs, setRigs] = useState<{ rigName: string; rigNumber: number }[]>([
        { rigName: "No Rigs", rigNumber: 0 },
    ]);

    const [selectedDate, setSelectedDate] = useState(
        `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()}`
    ); // State to store the selected date
    const [numberOfMonths, setNumberOfMonths] = useState(3); // State to store the number of months to display

    const currentMonth = new Date().toISOString().slice(0, 7);

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const [dates, setDates] = useState(
        getMonthsInView(currentDate, numberOfMonths)
    ); // State to store the months to display

    const handleViewChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Get the form element from the event
        const form = event.target as HTMLFormElement;

        // Explicitly assert the type to HTMLInputElement and acces value
        const dateInput = (
            form.elements.namedItem("monthInput") as HTMLInputElement
        )?.value;
        const numberInput = (
            form.elements.namedItem("numberInput") as HTMLInputElement
        )?.value;

        setSelectedMonth(dateInput);
        setSelectedDate(dateInput);
        setNumberOfMonths(parseInt(numberInput));
        goTo(dateInput, parseInt(numberInput));
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

    const goTo = (viewDate: string, number: number) => {
        // Function to change the date and number of months to display
        const newDate = new Date(viewDate);
        if (!isNaN(newDate.valueOf())) {
            if (!isNaN(number)) {
                setDates(getMonthsInView(newDate, number));
            } else {
                setDates(getMonthsInView(newDate, 3));
            }
        } else {
            setDates(getMonthsInView(currentDate, numberOfMonths));
        }
    };

    // convert dates to string for query
    const queryDates = getQueryDates(dates[0], dates[dates.length - 1]);

    const {
        // get test rigs
        loading: loadingRigs,
        error: errorRigs,
        data: dataRigs,
    } = useQuery(GET_TEST_RIGS);

    const {
        // get blade projects
        loading: loadingBP,
        error: errorBP,
        data: dataBP,
    } = useQuery(GET_ALL_BLADE_PROJECTS);

    const {
        // get blade tasks in range
        loading: loadingBT,
        error: errorBT,
        data: dataBT,
    } = useSubscription(GET_BT_IN_RANGE_SUB, {
        variables: {
            startDate: queryDates.startDate,
            endDate: queryDates.endDate,
            isActive: !editMode.isEditMode,
        },
    });

    const {
        loading: loadingPendingBT,
        error: errorPendingBT,
        data: dataPendingBT,
    } = useSubscription(GET_BT_PENDING_SUB);

    if (loadingRigs) {
        return <p>Loading...</p>;
    }
    if (errorRigs) {
        //TDOO: Find better way to handle timesout token
        console.log(errorRigs);
        localStorage.removeItem("token");
        return <p>Error {errorRigs.message} </p>;
    }
    if (loadingBT) {
        return <p>Loading...</p>;
    }
    if (errorBT) {
        return <p>Error {errorBT.message}</p>;
    }
    if (loadingPendingBT) {
        return <p>Loading...</p>;
    }
    if (errorPendingBT) {
        return <p>Error {errorPendingBT.message}</p>;
    }
    if (loadingBP) {
        return <p>Loading...</p>;
    }
    if (errorBP) {
        return <p>Error {errorBP.message}</p>;
    }

    const customers: string[] = [];
    dataBP["AllBladeProjects"].forEach((bp: any) => {
        if (!customers.includes(bp.customer)) {
            customers.push(bp.customer);
        }
    });

    const numberOfRigs = parseInt(dataRigs.DictionaryAllByCategory[0].label);
    if (rigs.length !== numberOfRigs) {
        // if number of rigs changed, update rigs
        setRigs(createRigs(numberOfRigs));
    }

    if (editMode.isEditMode) {
        props.setFilter("None");
    }

    //Making schedule BladeTaskCards
    let btCards: React.ReactNode[] = [];
    dataBT["AllBladeTasksInRangeSub"].forEach((bt: any) => {
        let btShown = false;
        if (
            bt.bladeProject.customer === props.filter ||
            props.filter === "None" ||
            editMode.isEditMode
        ) {
            btShown = true;
        }
        let dateSplit = bt.startDate.split("-");
        const year = parseInt(dateSplit[0]);
        const month = parseInt(dateSplit[1]) - 1; // month is 0 indexed
        const day = parseInt(dateSplit[2]);

        let endDateSplit = bt.endDate.split("-");
        const endYear = parseInt(endDateSplit[0]);
        const endMonth = parseInt(endDateSplit[1]) - 1; // month is 0 indexed
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
                enableDraggable={editMode.isEditMode}
                inConflict={bt.inConflict}
            />
        );
    });

    //Making pending BladeTaskCards
    let btCardsPending: React.ReactNode[] = [];
    dataPendingBT["AllBladeTasksPendingSub"].forEach((bt: any) => {
        let btShown = false;
        if (
            bt.bladeProject.customer === props.filter ||
            props.filter === "None" ||
            editMode.isEditMode
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
                enableDraggable={editMode.isEditMode}
                inConflict={false}
            />
        );
    });

    return (
        <div className="ScheduleContentContainer">
            <div className="ScheduleViewControl">
                <form
                    onSubmit={(e) => {
                        handleViewChange(e);
                    }}
                >
                    <input
                        name="monthInput"
                        type="month"
                        defaultValue={selectedMonth}
                    />
                    <label htmlFor="numberInput" className="text-sm">
                        Months shown:
                    </label>
                    <input
                        name="numberInput"
                        type="number"
                        defaultValue={numberOfMonths}
                        min="2"
                        max="24"
                    />
                    <input className="goButton" type="submit" value={"Go To"} />
                </form>
            </div>
            {editMode.isEditMode ? (
            <div className="ScheduleFilterAndMode">
                <SwitchComponent setShowPasswordPrompt={props.setShowPasswordPrompt} />
                {localStorage.getItem('token') && <StyledButton onClick={()=>{localStorage.removeItem('token'); window.location.reload();}}> Logout </StyledButton>}
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
                    {customers.map((customer) => FilterCustomers(customer))}
                </select>
               <SwitchComponent setShowPasswordPrompt={props.setShowPasswordPrompt} />
               {localStorage.getItem('token') && <StyledButton onClick={()=>{localStorage.removeItem('token'); window.location.reload();}}> Logout </StyledButton>}
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
        // format date to match query YYYY-MM-DD
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

export function createRigs(numberOfRigs: number) {
    let rigs: { rigName: string; rigNumber: number }[] = [];
    for (let i = 1; i <= numberOfRigs; i++) {
        rigs.push({
            rigName: "Rig " + i.toString(),
            rigNumber: i,
        });
    }
    return rigs;
}

function FilterCustomers(customer: string) {
    return (
        <option key={customer} value={customer}>
            {customer}
        </option>
    );
}
