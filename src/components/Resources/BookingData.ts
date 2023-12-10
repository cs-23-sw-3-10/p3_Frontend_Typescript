export type BookingDataQuery = {
    id: number;
    startDate: string;
    endDate: string;
    duration: string;
    resourceType: string;
    workHours: string;
    equipment: [
        {
            name: string;
        }
    ];
    engineer: [
        {
            name: string;
        }
    ];
    technician: [
        {
            type: string;
        }
    ];
    combined: string;
};
