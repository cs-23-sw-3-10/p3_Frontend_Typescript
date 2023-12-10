import React from 'react';
import { InErrorChart } from './BTMenuTypes';

function DurationSelector({duration, setDuration, inErrorChart, setInErrorChart}:{duration:number,setDuration:Function, inErrorChart:InErrorChart, setInErrorChart:Function}) {
    const hideErrorMessages = () => {
        const newInErrorChart:InErrorChart = {...inErrorChart};
        newInErrorChart.duration[0] = false;
        newInErrorChart.duration[1] = false;
        setInErrorChart(newInErrorChart);
    }
    
    return (
        <>
            <h2 className="title">{"Duration(Days)"}</h2>
            <input
                type="number"
                className={(inErrorChart.duration[0] || inErrorChart.duration[1]) ? "error" : "item duration_select input"}
                name="duration_select"
                placeholder={(inErrorChart.duration[0] || inErrorChart.duration[1]) ? (inErrorChart.duration[0] ? "Duration cannot be negative" : "Please provide duration") : "Select Duration"}
                value={(inErrorChart.duration[0] || inErrorChart.duration[1]) ? "" : duration}
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
        newInErrorChart.duration[0] = false;
        setInErrorChart(newInErrorChart);
        setDuration(userInput);
    }else{
        newInErrorChart.duration[0] = true;
        setInErrorChart(newInErrorChart);
        setDuration("");
    }
}

export default DurationSelector;