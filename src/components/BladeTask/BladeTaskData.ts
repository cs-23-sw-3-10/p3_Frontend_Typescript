export type BladeTaskQuery = {
    id: number;
    startDate: string;
    endDate: string;
    duration: number;
    testType: string;
    attachPeriod: number;
    detachPeriod: number;
    taskName: string;
    testRig: string;
    bladeProject: [
        {
            id: number;
        }
    ];
};
