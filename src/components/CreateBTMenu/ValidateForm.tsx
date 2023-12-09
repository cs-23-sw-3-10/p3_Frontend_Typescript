import { BTOrder} from "./BTMenuTypes";
import { InErrorChart } from "./BTMenuTypes";

//ValidateForm checks if the required fields have been filled out
//The validation of the individual input fields happen in their respective components
//Required Fields: taskName, testType, bladeProjectID, duration, attachPeriod, detachPeriod
export function ValidateForm(currentOrder:BTOrder, inErrorChart:InErrorChart, setInErrorChart:Function){
    let newInErrorChart = {...inErrorChart};
    newInErrorChart.taskName[0] = (currentOrder.taskName === "");
    newInErrorChart.testType = (currentOrder.testType === "");
    newInErrorChart.bladeProjectId = (currentOrder.bladeProjectId === "");
    newInErrorChart.duration = (currentOrder.duration >= 0);
    newInErrorChart.attachPeriod = (currentOrder.attachPeriod >= 0);
    newInErrorChart.detachPeriod = (currentOrder.detachPeriod >= 0);
    setInErrorChart(newInErrorChart)
    
    if(newInErrorChart.taskName[0] || newInErrorChart.testType ||  
        newInErrorChart.bladeProjectId ||   newInErrorChart.duration || 
        newInErrorChart.attachPeriod  ||  newInErrorChart.detachPeriod)
    {
        return false;
    }else return true;
}