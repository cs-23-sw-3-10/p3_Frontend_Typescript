import { InErrorChart } from "./BTMenuTypes";

function AttachPeriodSelector(
    {duration, detachPeriod, attachPeriod, setAttachPeriod, inErrorChart, setInErrorChart}:
    {duration:number, detachPeriod:number, attachPeriod: number, setAttachPeriod:Function, inErrorChart:InErrorChart, setInErrorChart:Function}) {
    return (
        <>
            <h2 className="title">{"Attach Period (Days)"}</h2>
            <input
                type="number"
                className={inErrorChart.AttachPeriod ? "error" : "item attach_period_select"}
                name="attach_period_select"
                placeholder='Days'
                value={attachPeriod}
                onChange={(e) => setAttachPeriod(e.currentTarget.value)}
                onBlur={(e) => handleAttachPeriodValidation(e, duration, detachPeriod, setAttachPeriod, inErrorChart, setInErrorChart)}
            />
        </>
    );
}

function handleAttachPeriodValidation(e: React.FormEvent<HTMLInputElement>, duration:number, detachPeriod:number, setAttachPeriod:Function, inErrorChart:InErrorChart, setInErrorChart:Function){
    const newInErrorChart:InErrorChart = {...inErrorChart};
    const userInput = Number(e.currentTarget.value);
    if((userInput > 0) && (detachPeriod + userInput) <= duration){
        newInErrorChart.AttachPeriod = false;
        setInErrorChart(newInErrorChart);
        setAttachPeriod(userInput);
    }else{
        newInErrorChart.AttachPeriod = true;
        setInErrorChart(newInErrorChart);
        setAttachPeriod(0);
    }
}

export default AttachPeriodSelector;