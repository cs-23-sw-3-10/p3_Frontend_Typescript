import { InErrorChart } from "./BTMenuTypes";

/**
 * Selector for Attach Period of a Blade Task
 * @param attachPeriod The state which holds the value for the attach period in days
 * @param inErrorChart Used to indicate an error in the BT-menu if the period is set incorrectly
 * @returns Title and Input field for attach period
 */
function AttachPeriodSelector({
    duration,
    detachPeriod,
    attachPeriod,
    setAttachPeriod,
    inErrorChart,
    setInErrorChart,
}: {
    duration: number;
    detachPeriod: number;
    attachPeriod: number;
    setAttachPeriod: Function;
    inErrorChart: InErrorChart;
    setInErrorChart: Function;
}) {
    const hideErrorMessages = () => {
        const newInErrorChart: InErrorChart = { ...inErrorChart };
        newInErrorChart.attachPeriod[0] = false;
        newInErrorChart.attachPeriod[1] = false;
        newInErrorChart.attachPeriod[2] = false;
        setInErrorChart(newInErrorChart);
    };

    return (
        <>
            <h2 className="title">{"Attach Period (Days)"}</h2>

            {/*Changes the style based on user input - error is defined in BladeTaskMenu.css*/}
            <input
                type="number"
                className={
                    inErrorChart.attachPeriod[0] || inErrorChart.attachPeriod[1] || inErrorChart.attachPeriod[2] ? "error" : "item attach_period_select input"
                }
                name="attach_period_select"
                placeholder={
                    // check for 0, 1 and 2
                    inErrorChart.attachPeriod[0] || inErrorChart.attachPeriod[1] || inErrorChart.attachPeriod[2]
                        ? inErrorChart.attachPeriod[0]
                            ? "Attach period cannot be negative"
                            : inErrorChart.attachPeriod[1]
                            ? "Please provide attach period"
                            : "Attach period cannot be in the past"
                        : "Select Attach Period"
                }
                value={inErrorChart.attachPeriod[0] || inErrorChart.attachPeriod[1] || inErrorChart.attachPeriod[2] ? "" : attachPeriod}
                onChange={(e) => setAttachPeriod(parseInt(e.currentTarget.value))}
                onBlur={(e) => handleAttachPeriodValidation(e, duration, detachPeriod, setAttachPeriod, inErrorChart, setInErrorChart)}
                onSelect={hideErrorMessages}
            />
        </>
    );
}

//Checks if:
// 1) The attach period is non-negative
function handleAttachPeriodValidation(
    e: React.FormEvent<HTMLInputElement>,
    duration: number,
    detachPeriod: number,
    setAttachPeriod: Function,
    inErrorChart: InErrorChart,
    setInErrorChart: Function
) {
    const newInErrorChart: InErrorChart = { ...inErrorChart };
    const userInput = Number(e.currentTarget.value);
    if (userInput >= 0 && userInput < 500) {
        //Valid input
        newInErrorChart.attachPeriod[0] = false;
        setInErrorChart(newInErrorChart);
        setAttachPeriod(userInput);
    } else {
        newInErrorChart.attachPeriod[0] = true;
        setInErrorChart(newInErrorChart);
        //Reset input field to 0
        setAttachPeriod("");
    }
}

export default AttachPeriodSelector;
