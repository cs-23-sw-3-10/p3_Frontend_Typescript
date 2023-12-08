import { BTOrder } from "../CreateBTMenu/BTMenuTypes";
import { ResourceOrder } from "../CreateBTMenu/BTMenuTypes";

export type BladeProjectForm = {
    projectName: string; //Changed in menu
    customer: string; //Changed in menu
    leader: string; //Changed in menu
    equipmentList: Array<ResourceOrder>; //Changed in menu
    bladeTaskList: Array<BTOrder>; //Used by menu to display existing tasks in editing mode
}