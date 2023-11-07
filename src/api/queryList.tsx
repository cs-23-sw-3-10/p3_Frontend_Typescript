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
            project {
                id
            }
        }
    }
`;

export const GET_ALL_BP = gql`
    query AllBladeProjects {
        AllBladeProjects {
            id
            start_date
            end_date
            customer
            projectLeader
            projectName
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
                start_date
                end_date
                duration
            }
        }
    }
`;
