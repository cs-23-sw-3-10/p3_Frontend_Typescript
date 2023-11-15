export type InErrorChart = {
    BTName: boolean;
    Type: boolean;
    StartDate: boolean;
    Duration: boolean;
    TestRig: boolean;
    Equipment: boolean;
    Employees: boolean;
}

export type BTOrder = {
    Project: string;
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
    EquipmentAmount: number;
    WorkHours: number;
    Period: Array<boolean>;
}