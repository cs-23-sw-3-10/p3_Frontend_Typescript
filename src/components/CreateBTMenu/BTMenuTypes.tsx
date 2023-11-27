export type InErrorChart = {
    bladeProjectId: boolean;
    taskName: boolean;
    testType: boolean;
    startDate: boolean;
    duration: boolean;
    attachPeriod: boolean;
    detachPeriod: boolean;
    testRig: boolean;
    equipment: boolean;
    employees: boolean;
}

export type BTOrder = {
    bladeProjectId: string;
    taskName: string;
    testType: string;
    startDate: string;
    duration: number;
    attachPeriod: number;
    detachPeriod: number;
    testRig: number;
    resourceOrders: Array<ResourceOrder>;
}

export type ResourceOrder = {
    resourceType: string;
    resourceName: string;
    equipmentAssignmentStatus: Array<boolean>;
    workHours: number;
}


