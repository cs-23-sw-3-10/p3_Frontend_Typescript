
import {gql} from '@apollo/client';


export const CREATE_EQUIPMENT_MUTATION = gql`
    mutation CreateEquipment($type: String!, $calibrationExpirationDate: String!, $name: String!) {
        CreateEquipment(type: $type, calibrationExpirationDate: $calibrationExpirationDate, name: $name) {
            id
            type
            calibrationExpirationDate
            name
        }
    }
`;
export const CREATE_ENGINEER_MUTATION = gql`
    mutation CreateEngineer($name: String!, $maxWorkHours: Int!) {
        CreateEngineer(name: $name, maxWorkHours: $maxWorkHours) {
            id
            name
            maxWorkHours
        }
    }
`;
export const CREATE_TECHNICIAN_MUTATION = gql`
    mutation CreateTechnician($type: String!, $maxWorkHours: Int!, $count: Int!) {
        CreateTechnician(type: $type, maxWorkHours: $maxWorkHours, count: $count,) {
            id
            type
            workHours
            maxWorkHours
            count
        }
    }
`;
export const UPDATE_BT = gql`
    mutation updateStartAndDurationBladeTask(
        $id: ID!
        $startDate: String!
        $duration: Int!
        $rig: Int!
    ) {
        updateStartAndDurationBladeTask(id: $id, startDate: $startDate, duration: $duration, testRig: $rig) {
            id
                    }
    }
`;

export const ADD_BT = gql`
mutation CreateBladeTask($bladeTask: BladeTaskInput!) {
    createBladeTask(bladeTask: $bladeTask){
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
        task {
          id
        }
        equipment {
          id
        }
        engineer {
          id
        }
        technician {
          id
        }
      }
      resourceOrders {
        id
        resourceName
        resourceType
        amount
        workHours
        equipmentAssignmentStatus
      }
    }
  }
`;