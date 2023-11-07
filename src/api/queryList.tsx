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

