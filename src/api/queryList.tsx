import { gql } from "@apollo/client";

export const GET_ALL_BT = gql`
    query GetAllBT {
        AllBladeTasks {
            id
            testRig
            taskName
            testType
            startDate
            endDate
            duration
            attachPeriod
            detachPeriod
            bladeProject {
                id
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
