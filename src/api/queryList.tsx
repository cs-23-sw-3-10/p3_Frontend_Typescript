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

export const GET_ALL_BT_NAMES = gql`
  query GetAllBTNames{
    AllBladeTasks{
      taskName
   }
  }
`;

export const GET_TEST_TYPES = gql`
query GetTestTypes{
  DictionaryAllByCategory(category:"testType"){
    label
  }
}
`;

export const GET_TEST_RIGS = gql`
query GetTestRigs{
  DictionaryAllByCategory(category:"testRigs"){
    label
  }
}
`;

export const GET_ALL_EQUIPMENT_TYPES = gql`
query GetAllEquipmentTypes{
    DictionaryAllByCategory(category:"equipmentType"){
      id
    	label
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

export const GET_ALL_ENGINEERS = gql`
query AllEngineers{
  AllEngineers{
    __typename
    id
    name
    workHours
    maxWorkHours
  }
}
`;

export const GET_ALL_TECHNICIANS = gql`
query AllTechnicians{
  AllTechnicians{
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
query GetAllBladeProjects{
  AllBladeProjects{
    __typename
    id
    projectName
    customer
  }
}
`;







