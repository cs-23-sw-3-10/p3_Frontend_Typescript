import { InErrorChart } from "./BTMenuTypes";

function DetachPeriodSelector(
    {duration, attachPeriod, detachPeriod, setDetachPeriod, inErrorChart, setInErrorChart}:
    {duration:number, attachPeriod: number, detachPeriod:number, setDetachPeriod:Function, inErrorChart:InErrorChart, setInErrorChart:Function}) {
    return (
        <>
            <h2 className="title">{"Detach Period (Days)"}</h2>
            <input
                type="number"
                className={inErrorChart.detachPeriod ? "error" : "item detach_period_select input"}
                name="detach_period_select"
                placeholder='Select Detach Period'
                value={(detachPeriod === 0) ? "" : detachPeriod}
                onChange={(e) => setDetachPeriod(parseInt(e.currentTarget.value))}
                onBlur={(e) => handleDetachPeriodValidation(e, duration, attachPeriod, setDetachPeriod, inErrorChart, setInErrorChart)}
            />
        </>
    );
}

function handleDetachPeriodValidation(e: React.FormEvent<HTMLInputElement>, duration:number, attachPeriod:number, setDetachPeriod:Function, inErrorChart:InErrorChart, setInErrorChart:Function){
    const newInErrorChart:InErrorChart = {...inErrorChart};
    const userInput = Number(e.currentTarget.value);
    if((userInput >= 0)){
        newInErrorChart.detachPeriod = false;
        setInErrorChart(newInErrorChart);
        setDetachPeriod(userInput);
    }else{
        newInErrorChart.detachPeriod = true;
        setInErrorChart(newInErrorChart);
        setDetachPeriod(0);
    }
}

export default DetachPeriodSelector;