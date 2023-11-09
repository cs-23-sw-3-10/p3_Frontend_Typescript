export type BladeTaskQuery = {
    id: number;
    startDate: string;
    endDate: string;
    duration: string;
    testType: string;
    attachPeriod: string;
    detachPeriod: string;
    taskName: string;
    testRig: string;
    bladeProject: [
        {
            id: number;
        }
    ];
};
