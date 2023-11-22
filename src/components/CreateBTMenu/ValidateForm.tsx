import { BTOrder } from "./BTMenuTypes";

//ValidateForm checks if the required fields have been filled out
//The validation of the individual input fields happen in their respective components
export function ValidateForm(currentOrder:BTOrder){
    let btNameIsValid = (currentOrder.taskName !== "");
    let typeIsValid = (currentOrder.testType !== "");
    let projectIsValid = (currentOrder.bladeProjectId !== "");
    let durationIsValid = (currentOrder.duration > 0);
    let attachPeriodIsValid = (currentOrder.attachPeriod > 0);
    let detachPeriodIsValid = (currentOrder.detachPeriod > 0);
    let sumOfAttachAndDetachIsValid = ((currentOrder.attachPeriod + currentOrder.detachPeriod) <= currentOrder.duration);
    
    if(btNameIsValid && typeIsValid && 
       projectIsValid && durationIsValid && 
       attachPeriodIsValid && detachPeriodIsValid && 
       sumOfAttachAndDetachIsValid)
    {
        return true;
    }else return false;
}