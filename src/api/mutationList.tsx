import { gql } from "@apollo/client";

const addBT = gql`
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