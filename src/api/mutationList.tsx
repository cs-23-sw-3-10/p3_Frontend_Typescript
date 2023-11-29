import { gql } from "@apollo/client";

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