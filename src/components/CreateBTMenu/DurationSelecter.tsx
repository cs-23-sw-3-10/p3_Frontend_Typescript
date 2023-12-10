import React from 'react';
import { InErrorChart } from './BTMenuTypes';

function DurationSelector({duration, setDuration, inErrorChart, setInErrorChart}:{duration:number,setDuration:Function, inErrorChart:InErrorChart, setInErrorChart:Function}) {
    const hideErrorMessages = () => {
        const newInErrorChart:InErrorChart = {...inErrorChart};
        newInErrorChart.duration = false;
        setInErrorChart(newInErrorChart);
    }
    
    return (
        <>
            <h2 className="title">{"Duration(Days)"}</h2>
            <input
                type="number"
                className={inErrorChart.duration ? "error" : "item duration_select input"}
                name="duration_select"
                placeholder={inErrorChart.duration ? "Duration cannot be negative" : "Select Duration"}
                value={(duration === 0) ? "" : duration}
                onChange={(e) => setDuration(parseInt(e.currentTarget.value))}
                onBlur={(e) => handleDurationValidation(e, setDuration, inErrorChart, setInErrorChart)}
                onSelect={hideErrorMessages}
            />
        </>
    );
}

function handleDurationValidation(e: React.FormEvent<HTMLInputElement>, setDuration:Function, inErrorChart:InErrorChart, setInErrorChart:Function){
    const newInErrorChart:InErrorChart = {...inErrorChart};
    const userInput = Number(e.currentTarget.value);

    if(userInput >= 0){
        newInErrorChart.duration = false;
        setInErrorChart(newInErrorChart);
        setDuration(userInput);
    }else{
        newInErrorChart.duration = true;
        setInErrorChart(newInErrorChart);
        setDuration(0);
    }
}

export default DurationSelector;