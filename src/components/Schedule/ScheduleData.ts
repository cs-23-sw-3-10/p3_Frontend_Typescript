export type ScheduleDataQuery = {
        id: number;
        isActive: boolean;
        bladeProject:[{
            id: number;
            startDate: string;
            endDate: string;
            customer: string;
            projectLeader: string;
            projectName: string;
            color: string; 
        }]
            bladeTasks:[{
                id: number;
                startDate: string;
                endDate: string;
                duration: number;
                testType: string;
                attachPeriod: number;
                detachPeriod: number;
                taskName: string;
                testRig: string;
                inConflict: boolean;
            }]
        }
