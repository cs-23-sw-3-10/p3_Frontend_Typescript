export type BladeProjectDataQuery = {
    id: number;
    startDate: string;
    endDate: string;
    customer: string;
    projectLeader: string;
    projectName: string;
    bladeTasks: [
        {
            id: number;
            startDate: string;
            endDate: string;
            duration: number;
            testType: string;
            attachPeriod: number;
            detachPeriod: number;
            taskName: string;
            testRig: string;
            bookings: [
                {
                    id: number;
                    startDate: string;
                    endDate: string;
                    duration: number;
                    resourceType: string;
                    workHours: number;
                }
            ];
        }
    ];
};
