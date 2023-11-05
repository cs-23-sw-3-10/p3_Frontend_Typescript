import {gql} from '@apollo/client';

export const GET_ALL_BT = gql`
  query GetAllBT{
    AllBladeTasks{
      id
      testRig
      taskName
      testType
      startDate
      endDate
      duration
      attachPeriod
      detachPeriod
      project{
        id
      }
    }
  }
`;

