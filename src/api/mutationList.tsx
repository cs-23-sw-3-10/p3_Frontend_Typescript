import { gql } from "@apollo/client";

export const UPDATE_BT = gql`
    mutation updateStartAndDurationBladeTask(
        $id: ID!
        $startDate: String
        $duration: Int!
        $rig: Int
    ) {
        updateStartAndDurationBladeTask(id: $id, startDate: $startDate, duration: $duration, testRig: $rig) {
            id
                    }
    }
`;