import { BTOrder } from "./BTMenuTypes";
import { InErrorChart } from "./BTMenuTypes";

//ValidateForm checks if the required fields have been filled out
//The validation of the individual input fields happen in their respective components
//Required Fields: taskName, testType, bladeProjectID, duration, attachPeriod, detachPeriod
export function ValidateForm(currentOrder: BTOrder, inErrorChart: InErrorChart, setInErrorChart: Function, BTNames: Array<string>, create: boolean) {
    let newInErrorChart = { ...inErrorChart };
    if (create) {
        newInErrorChart.taskName[0] = BTNames.includes(currentOrder.taskName); //Checks if Task Name exist in BP already
    }
    newInErrorChart.taskName[1] = currentOrder.taskName === ""; //Checks if Task Name is not empty
    newInErrorChart.testType = currentOrder.testType === ""; //Cheks if Test Type is not empty
    newInErrorChart.bladeProjectId = currentOrder.bladeProjectId === ""; //Cheks if BP id is provided
    newInErrorChart.duration[1] = currentOrder.duration < 1; //Checks if durations is provided and not negative
    newInErrorChart.attachPeriod[1] = currentOrder.attachPeriod < 0; //Checks if attach period is provided and not negative
    newInErrorChart.detachPeriod[1] = currentOrder.detachPeriod < 0; //Checks if detach period is provided and not negative
    newInErrorChart.attachPeriod[2] =
        currentOrder.attachPeriod > 0 && new Date(new Date(currentOrder.startDate).getTime() - currentOrder.attachPeriod * 24 * 60 * 60 * 1000) < new Date(); //Checks if attach period is in the past

    setInErrorChart(newInErrorChart); //Update error chart

    //If all statements above are false -> Create BT
    if (
        newInErrorChart.taskName[0] ||
        newInErrorChart.taskName[1] ||
        newInErrorChart.testType ||
        newInErrorChart.bladeProjectId ||
        newInErrorChart.duration[1] ||
        newInErrorChart.attachPeriod[1] ||
        newInErrorChart.detachPeriod[1] ||
        newInErrorChart.attachPeriod[2]
    ) {
        return false;
    } else return true;
}
