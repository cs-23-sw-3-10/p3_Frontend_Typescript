import { InErrorChart } from "./BTMenuTypes";

/**
 * Selector for Attach Period of a Blade Task
 * @param attachPeriod The state which holds the value for the attach period in days
 * @param inErrorChart Used to indicate an error in the BT-menu if the period is set incorrectly
 * @returns Title and Input field for attach period
 */
function AttachPeriodSelector(
    {duration, detachPeriod, attachPeriod, setAttachPeriod, inErrorChart, setInErrorChart}:
    {duration:number, detachPeriod:number, attachPeriod: number, setAttachPeriod:Function, inErrorChart:InErrorChart, setInErrorChart:Function}) {
    return (
        <>
            <h2 className="title">{"Attach Period (Days)"}</h2>
            
            {/*Changes the style based on user input - error is defined in BladeTaskMenu.css*/}
            <input
                type="number"
                className={inErrorChart.attachPeriod ? "error" : "item attach_period_select input"}
                name="attach_period_select"
                placeholder='Select Attach Period'
                value={(attachPeriod === 0) ? "" : attachPeriod}
                onChange={(e) => setAttachPeriod(parseInt(e.currentTarget.value))}
                onBlur={(e) => handleAttachPeriodValidation(e, duration, detachPeriod, setAttachPeriod, inErrorChart, setInErrorChart)}
            />
        </>
    );
}

//Checks if:
// 1) The attach period is non-negative
function handleAttachPeriodValidation(e: React.FormEvent<HTMLInputElement>, duration:number, detachPeriod:number, setAttachPeriod:Function, inErrorChart:InErrorChart, setInErrorChart:Function){
    const newInErrorChart:InErrorChart = {...inErrorChart};
    const userInput = Number(e.currentTarget.value);
    if((userInput >= 0)){
        //Valid input
        newInErrorChart.attachPeriod = false;
        setInErrorChart(newInErrorChart);
        setAttachPeriod(userInput);
    }else{
        newInErrorChart.attachPeriod = true;
        setInErrorChart(newInErrorChart);
        //Reset input field to 0
        setAttachPeriod(0); 
    }
}

export default AttachPeriodSelector;