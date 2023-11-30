import { BladeProjectForm } from "./BPMenuTypes";

export function validateBPForm(form: BladeProjectForm){
    const projectNameValid = (form.projectName !== "");
    const customerValid = (form.customer !== "");
    const leaderValid = (form.leader !== "");

    if(projectNameValid && customerValid && leaderValid) return true;
    return false;
}