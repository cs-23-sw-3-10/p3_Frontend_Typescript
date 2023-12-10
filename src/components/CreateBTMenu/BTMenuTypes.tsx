export type InErrorChart = {
    bladeProjectId: boolean;
    taskName: Array<boolean>;
    testType: boolean;
    startDate: boolean;
    duration: Array<boolean>;
    attachPeriod: Array<boolean>;
    detachPeriod: Array<boolean>;
    testRig: boolean;
    equipment: boolean;
    employees: boolean;
};

export function createEmptyInErrorChart(): InErrorChart {
    return {
        bladeProjectId: false,
        taskName: [false, false],
        testType: false,
        startDate: false,
        duration: [false, false],
        attachPeriod: [false, false, false],
        detachPeriod: [false, false],
        testRig: false,
        equipment: false,
        employees: false,
    };
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
};

export type ResourceOrder = {
    resourceType: string;
    resourceName: string;
    equipmentAssignmentStatus: Array<boolean>;
    workHours: number;
};

export type BladeProjectByIdResult = {
    data: {
        BladeProjectById: {
            __typename: string;
            id: string;
            projectName: string;
            bladeTasks: BladeTask[];
        };
    };
};

export type BladeTask = {
    __typename: string;
    taskName: string;
};
