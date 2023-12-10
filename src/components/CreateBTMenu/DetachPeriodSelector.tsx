import { InErrorChart } from "./BTMenuTypes";

function DetachPeriodSelector(
    { duration, attachPeriod, detachPeriod, setDetachPeriod, inErrorChart, setInErrorChart }:
    { duration: number, attachPeriod: number, detachPeriod: number, setDetachPeriod: Function, inErrorChart: InErrorChart, setInErrorChart: Function }) {
    const hideErrorMessages = () => {
        const newInErrorChart: InErrorChart = { ...inErrorChart };
        newInErrorChart.detachPeriod[0] = false;
        newInErrorChart.detachPeriod[1] = false;
        setInErrorChart(newInErrorChart);
    }

    return (
        <>
            <h2 className="title">{"Detach Period (Days)"}</h2>
            <input
                type="number"
                className={(inErrorChart.detachPeriod[0] || inErrorChart.detachPeriod[1]) ? "error" : "item detach_period_select input"}
                name="detach_period_select"
                placeholder={(inErrorChart.detachPeriod[0] || inErrorChart.detachPeriod[1]) ? (inErrorChart.detachPeriod[0] ? "Detach period cannot be negative" : "Please provide detach period") : 'Select Detach Period'}
                value={(detachPeriod === 0) ? "" : detachPeriod}
                onChange={(e) => setDetachPeriod(parseInt(e.currentTarget.value))}
                onBlur={(e) => handleDetachPeriodValidation(e, duration, attachPeriod, setDetachPeriod, inErrorChart, setInErrorChart)}
                onSelect={hideErrorMessages}
            />
        </>
    );
}

function handleDetachPeriodValidation(e: React.FormEvent<HTMLInputElement>, duration: number, attachPeriod: number, setDetachPeriod: Function, inErrorChart: InErrorChart, setInErrorChart: Function) {
    const newInErrorChart: InErrorChart = { ...inErrorChart };
    const userInput = Number(e.currentTarget.value);
    if ((userInput >= 0)) {
        newInErrorChart.detachPeriod[0] = false;
        setInErrorChart(newInErrorChart);
        setDetachPeriod(userInput);
    } else {
        newInErrorChart.detachPeriod[0] = true;
        setInErrorChart(newInErrorChart);
        setDetachPeriod(0);
    }
}

export default DetachPeriodSelector;