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