export type InErrorChart = {
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
    ResourceType: string;
    ResourceName: string;
    EquipmentAmount: number;
    WorkHours: number;
    Period: Array<boolean>;
}


