import { gql } from "@apollo/client";

/**
 * This file contains all the queries used in the application
 */
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

export const GET_BT_IN_RANGE = gql`
query AllBladeTasksInRange($startDate: String!, $endDate: String!) {
    AllBladeTasksInRange(startDate: $startDate, endDate: $endDate) {
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
            color
        }
    }
}
`;

export const GET_ALL_BT_WITH_BOOKINGS_EQNAME = gql`
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
            equipment {
                id
                name
            }
            engineer {
                name
            }
            technician {
                id
            }
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

export const GET_BT_DATE_INFO = gql`
  query GetBTDateInfo{
    AllBladeTasks{
      testRig
      startDate
      endDate
      duration
      attachPeriod
      detachPeriod
      bladeProject{
        id
      }
  }
}
`;

