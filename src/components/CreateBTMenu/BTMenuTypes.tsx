export type InErrorChart = {
    Project: boolean;
    BTName: boolean;
    Type: boolean;
    StartDate: boolean;
    Duration: boolean;
    AttachPeriod: boolean;
    DetachPeriod: boolean;
    TestRig: boolean;
    Equipment: boolean;
    Employees: boolean;
}

export type BTOrder = {
    Project: string;
    BTName: string;
    Type: string;
    StartDate: string;
    Duration: number;
    AttachPeriod: number;
    DetachPeriod: number;
    TestRig: number;
    ResourceOrders: Array<ResourceOrder>;
}

export type ResourceOrder = {
    resourceType: string;
    resourceName: string;
    equipmentAssignmentStatus: Array<boolean>;
    workHours: number;
}


