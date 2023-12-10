import { BTOrder} from "./BTMenuTypes";
import { InErrorChart } from "./BTMenuTypes";

//ValidateForm checks if the required fields have been filled out
//The validation of the individual input fields happen in their respective components
//Required Fields: taskName, testType, bladeProjectID, duration, attachPeriod, detachPeriod
export function ValidateForm(currentOrder:BTOrder, inErrorChart:InErrorChart, setInErrorChart:Function, BTNames:Array<string>){
    let newInErrorChart = {...inErrorChart};
    newInErrorChart.taskName[0] = (BTNames.includes(currentOrder.taskName)); //Checks if BT name exist in BP already
    newInErrorChart.taskName[1] = (currentOrder.taskName === "");
    newInErrorChart.testType = (currentOrder.testType === "");
    newInErrorChart.bladeProjectId = (currentOrder.bladeProjectId === "");
    newInErrorChart.duration[1] = (currentOrder.duration >= 0);
    newInErrorChart.attachPeriod[1] = (currentOrder.attachPeriod >= 0);
    newInErrorChart.detachPeriod[1] = (currentOrder.detachPeriod >= 0);
    setInErrorChart(newInErrorChart)
    
    if(newInErrorChart.taskName[0] || newInErrorChart.taskName[1] || newInErrorChart.testType ||  
        newInErrorChart.bladeProjectId ||    newInErrorChart.duration[1] || 
        newInErrorChart.attachPeriod[1]  ||  newInErrorChart.detachPeriod[1])
    {
        return false;
    }else return true;
}