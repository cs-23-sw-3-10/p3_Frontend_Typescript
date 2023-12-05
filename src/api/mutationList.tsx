
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

export const UPDATE_BT_INFO = gql`
  mutation updateBTInfo($updates: BladeTaskInput!, $id: Int!) {
      updateBTInfo(updates: $updates, btId: $id) {
        id
        startDate
        endDate
        duration
        testType
        attachPeriod
        detachPeriod
        taskName
        testRig
    
      resourceOrders {
        id
        resourceName
        resourceType
        workHours
        equipmentAssignmentStatus
      }
    }
  }
`;

export const CREATE_BP = gql`
    mutation CreateBladeProject{
        createBladeProject{
            id
            projectName
            customer
            color
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
        workHours
        equipmentAssignmentStatus
      }
    }
  }
`;

export const ADD_BP = gql`
mutation CreateBladeProject($name: String, $customer: String, $projectLeader: String){
  createBladeProject(name: $name, customer: $customer, projectLeader: $projectLeader ){
    id
    projectName
    customer
    projectLeader
    startDate
    endDate
  }
}
`;

export const UPDATE_BP = gql`
mutation UpdateBladeProject($bpId: Int!, $updates: BladeProjectInput!){
  updateBladeProject(bpId: $bpId, updates: $updates){
    projectName
    customer
    projectLeader
    startDate
    endDate
  }
}
`;
export const DELETE_EQUIPMENT = gql`
mutation DeleteEquipment($name: String!) {
    DeleteEquipment(name: $name) {
        id
        type
        name
        calibrationExpirationDate
    }
}
`;
export const DELETE_TECHNICIAN = gql`
mutation DeleteTechnician($type: String!) {
    DeleteTechnician(type: $type) {
        id
        type
        workHours
        maxWorkHours
        count
    }
}
`;
export const DELETE_ENGINEER = gql`
mutation DeleteEngineer($name: String!) {
    DeleteEngineer(name: $name) {
        id
        name
        workHours
        maxWorkHours
    }
}
`;

export const CLONE_AND_REPLACE = gql`
mutation CloneScheduleAndReplace {
        cloneScheduleAndReplace {
            id
            isActive
        }
    }
`;