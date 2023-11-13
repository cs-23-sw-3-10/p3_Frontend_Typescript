import { gql } from "@apollo/client";

export const GET_ALL_BT = gql`
    query AllBladeTasks {
        AllBladeTasks {
            id
            startDate
            endDate
            duration
            testType
            attachPeriod
            detachPeriod
            taskName
            testRig
            bladeProject {
                id
            }
            bookings {
                id
                startDate
                endDate
                duration
                resourceType
                workHours
            }
        }
    }
`;

export const GET_ALL_BP = gql`
query AllBladeProjects {
    AllBladeProjects {
        id
        startDate
        endDate
        customer
        projectLeader
        projectName
        bladeTasks {
            id
            startDate
            endDate
            duration
            testType
            attachPeriod
            detachPeriod
            taskName
            testRig
            bookings {
                id
                startDate
                endDate
                duration
                resourceType
                workHours
            }
        }
    }
}

`;

export const GET_EQUIPMENT = gql`
    query AllEquipment {
        AllEquipment {
            type
            calibrationExpirationDate
            name
            bookings {
                startDate
                endDate
                duration
            }
        }
    }
`;

export const GET_BOOKINGS = gql`
    query AllBookings {
        AllBookings {
            id
            startDate
            endDate
            duration
            resourceType
            workHours
        }
    }
`;
