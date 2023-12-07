import { gql } from "@apollo/client";

/**
 * This file contains all the queries used in the application
 */

export const GET_ALL_BP_IN_DIFF_SCHEDULE = gql`
    query AllSchedules {
        AllSchedules {
            id
            isActive
            bladeProject {
                id
                startDate
                endDate
                customer
                projectLeader
                projectName
                color
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
                    inConflict
                }
            }
        }
    }
`;

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
            inConflict
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
            resourceOrders {
                id
                workHours
                resourceType
                resourceName
            }
        }
    }
`;

export const GET_BT_WITH_ID = gql`
    query BladeTaskById($id: ID!) {
        BladeTaskById(id: $id) {
            id
            startDate
            endDate
            duration
            testType
            attachPeriod
            detachPeriod
            taskName
            testRig
            inConflict
            bladeProject {
                id
            }
            resourceOrders {
                id
                workHours
                resourceType
                resourceName
                equipmentAssignmentStatus
            }
        }
    }
`;

export const GET_BT_IN_RANGE = gql`
    query AllBladeTasksInRange(
        $startDate: String!
        $endDate: String!
        $isActive: Boolean!
    ) {
        AllBladeTasksInRange(
            startDate: $startDate
            endDate: $endDate
            isActive: $isActive
        ) {
            id
            startDate
            endDate
            duration
            testType
            attachPeriod
            detachPeriod
            taskName
            testRig
            inConflict
            bladeProject {
                color
                customer
                id
            }
        }
    }
`;

export const GET_BT_IN_RANGE_SUB = gql`
    subscription AllBladeTasksInRangeSub(
        $startDate: String!
        $endDate: String!
        $isActive: Boolean!
    ) {
        AllBladeTasksInRangeSub(
            startDate: $startDate
            endDate: $endDate
            isActive: $isActive
        ) {
            id
            startDate
            endDate
            duration
            testType
            attachPeriod
            detachPeriod
            taskName
            testRig
            inConflict
            bladeProject {
                color
                customer
                id
                projectName
            }
        }
    }
`;

export const GET_BT_PENDING_SUB = gql`
    subscription AllBladeTasksPendingSub {
        AllBladeTasksPendingSub {
            id
            duration
            testType
            attachPeriod
            detachPeriod
            taskName
            bladeProject {
                color
                customer
                id
                projectName
            }
        }
    }
`;

export const GET_BT_PENDING = gql`
    query AllBladeTasksPending {
        AllBladeTasksPending {
            id
            duration
            testType
            attachPeriod
            detachPeriod
            taskName
            bladeProject {
                color
                customer
                id
                projectName
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
            inConflict
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
                    type
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
                inConflict
                bladeProject {
                    color
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
    }
`;

export const GET_EQUIPMENT_BY_TYPE = gql`
    query EquipmentByType($type: String!) {
        EquipmentByType(type: $type) {
            id
            name
            type
            calibrationExpirationDate
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

export const GET_ALL_BT_NAMES = gql`
    query GetAllBTNames {
        AllBladeTasks {
            taskName
        }
    }
`;

export const GET_TEST_TYPES = gql`
    query GetTestTypes {
        DictionaryAllByCategory(category: "testType") {
            id
            label
        }
    }
`;

export const GET_TEST_RIGS = gql`
    query GetTestRigs {
        DictionaryAllByCategory(category: "testRigs") {
            label
        }
    }
`;

export const GET_ALL_EQUIPMENT_TYPES = gql`
    query GetAllEquipmentTypes {
        DictionaryAllByCategory(category: "equipmentType") {
            id
            label
        }
    }
`;
export const GET_ALL_TECHNICIAN_TYPES = gql`
query GetAllTechnicianTypes{
    DictionaryAllByCategory(category:"technician"){
      id
    	label
    }
}
`;

export const GET_BT_DATE_INFO = gql`
    query GetBTDateInfo {
        AllBladeTasks {
            testRig
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

export const GET_ALL_ENGINEERS = gql`
    query AllEngineers {
        AllEngineers {
            __typename
            id
            name
            workHours
            maxWorkHours
        }
    }
`;

export const GET_ALL_TECHNICIANS = gql`
    query AllTechnicians {
        AllTechnicians {
            __typename
            id
            type
            workHours
            maxWorkHours
            count
        }
    }
`;

export const GET_ALL_BLADE_PROJECTS = gql`
    query GetAllBladeProjects {
        AllBladeProjects {
            __typename
            id
            projectName
            customer
        }
    }
`;

export const ALL_EQUIPMENT = gql`
query AllEquipment {
    AllEquipment {
        id
        type
        name
        calibrationExpirationDate
    }
}
`;
export const GET_EQUIPMENT_TYPES = gql`
query GetEquipmentTypes {
    GetEquipmentTypes
}
`;

export const GET_AUTHENTICATION_TOKEN = gql`
query Authenticate {
    authenticate
}
`;


export const GET_CONFLICTS_FOR_BT= gql`
    query findConflictsForBladeTask($id: ID!,$isActive: Boolean!) {
        findConflictsForBladeTask(id: $id,isActive: $isActive) {
            message
        }
    }
`;

export const GET_BOOKING_BY_BP_ID = gql`
query BladeProjectById($id: ID!){
    BookingByBPId(id:$id){
      resourceType
      resourceName
    }
  }
  `;

