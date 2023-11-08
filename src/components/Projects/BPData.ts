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
            duration: string;
            testType: string;
            attachPeriod: string;
            detachPeriod: string;
            taskName: string;
            testRig: string;
            bookings: [
                {
                    id: number;
                    startDate: string;
                    endDate: string;
                    duration: string;
                    resourceType: string;
                    workHours: string;
                }
            ];
        }
    ];
};
