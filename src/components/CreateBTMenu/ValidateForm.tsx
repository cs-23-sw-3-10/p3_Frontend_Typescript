import { BTOrder } from "./BTMenuTypes";

//ValidateForm checks if the required fields have been filled out
//The validation of the individual input fields happen in their respective components
export function ValidateForm(currentOrder:BTOrder){
    let btNameIsValid = (currentOrder.BTName !== "");
    let typeIsValid = (currentOrder.Type !== "");
    let projectIsValid = (currentOrder.Project !== "");
    let durationIsValid = (currentOrder.Duration > 0);
    let attachPeriodIsValid = (currentOrder.AttachPeriod > 0);
    let detachPeriodIsValid = (currentOrder.DetachPeriod > 0);
    let sumOfAttachAndDetachIsValid = ((currentOrder.AttachPeriod + currentOrder.DetachPeriod) <= currentOrder.Duration);
    
    if(btNameIsValid && typeIsValid && 
       projectIsValid && durationIsValid && 
       attachPeriodIsValid && detachPeriodIsValid && 
       sumOfAttachAndDetachIsValid)
    {
        return true;
    }else return false;
}