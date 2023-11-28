import { BTOrder } from "../CreateBTMenu/BTMenuTypes";

type BladeProjectForm = {
    id: number; //Set by DB
    startDate: string; //Set by inserting BT's
    endDate: string; //Set by inserting BT's
    projectName: string; //Changed in menu
    customer: string; //Changed in menu
    leader: string; //Changed in menu
    bladeTaskList: Array<BTOrder>;
}