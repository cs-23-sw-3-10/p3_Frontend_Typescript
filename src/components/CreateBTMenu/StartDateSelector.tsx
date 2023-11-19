import React from 'react';
import { InErrorChart } from './BTMenuTypes';

function StartDateSelector({startDate,setStartDate, inErrorChart, setInErrorChart}: {startDate:string,setStartDate:Function, inErrorChart:InErrorChart, setInErrorChart:Function}) {

    //Finds the current date in the format 'dd-mm-yyyy'
    return (
        <>
            <h2 className='title'>Start Date</h2>
            <input
                type="date"
                className={inErrorChart.StartDate ? "error" : "startdate_select"}
                value={startDate}
                onChange={(e) => setStartDate(e.currentTarget.value)}
                onBlur={(e) => handleDateValidation(e, setStartDate, setInErrorChart, inErrorChart)}
            />
        </>
    );
}

function handleDateValidation(e: React.FormEvent<HTMLInputElement>, setDate: Function, setInErrorChart: Function, inErrorChart: InErrorChart) {
    let inputFromForm: string = e.currentTarget.value;
    let currentDate: Date = new Date()
    let inputDate: Date = new Date(inputFromForm);

    //Granularity of days -> Set hour to the same value for both dates
    currentDate.setHours(1, 0, 0, 0);
    inputDate.setHours(1, 0, 0, 0);

    //Setting the date in input element requires date to be in string format
    let currentDateString: string = currentDate.toISOString().split('T')[0];
    const newErrorChart:InErrorChart = {...inErrorChart};

    if (inputDate >= currentDate) {
        newErrorChart.StartDate = false;
        setInErrorChart(newErrorChart);
        setDate(inputFromForm);
    } else {
        newErrorChart.StartDate = true;
        setInErrorChart(newErrorChart);
        setDate(currentDateString);
    }
}

export default StartDateSelector;