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