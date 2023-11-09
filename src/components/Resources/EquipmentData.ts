export type Equipment = {
    name: string;
    type: string;
    calibrationExpirationDate: string;
    bookings: [
        {
            starDate: string;
            endDate: string;
            duration: string;
        }
    ];
};
