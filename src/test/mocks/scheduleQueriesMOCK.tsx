import { GET_BT_DATE_INFO } from "../../api/queryList";

export const allBladeTaskDateData = [
    {
        "__typename": "BladeTask",
        "testRig": 1,
        "startDate": 20230101,
        "endDate": 20230115,
        "duration": 15,
        "attachPeriod": 2,
        "detachPeriod": 3,
        "bladeProject": {
            "__typename": "BladeProject",
            "id": "1"
        }
    },
    {
        "__typename": "BladeTask",
        "testRig": 1,
        "startDate": 20230116,
        "endDate": 20230130,
        "duration": 15,
        "attachPeriod": 2,
        "detachPeriod": 3,
        "bladeProject": {
            "__typename": "BladeProject",
            "id": "1"
        }
    },
    {
        "__typename": "BladeTask",
        "testRig": 1,
        "startDate": 20230131,
        "endDate": 20230330,
        "duration": 15,
        "attachPeriod": 2,
        "detachPeriod": 3,
        "bladeProject": {
            "__typename": "BladeProject",
            "id": "1"
        }
    },
    {
        "__typename": "BladeTask",
        "testRig": 2,
        "startDate": 20230201,
        "endDate": 20230215,
        "duration": 15,
        "attachPeriod": 2,
        "detachPeriod": 3,
        "bladeProject": {
            "__typename": "BladeProject",
            "id": "2"
        }
    },
    {
        "__typename": "BladeTask",
        "testRig": 2,
        "startDate": 20230216,
        "endDate": 20230228,
        "duration": 15,
        "attachPeriod": 2,
        "detachPeriod": 3,
        "bladeProject": {
            "__typename": "BladeProject",
            "id": "2"
        }
    },
    {
        "__typename": "BladeTask",
        "testRig": 2,
        "startDate": 20230231,
        "endDate": 20230331,
        "duration": 15,
        "attachPeriod": 2,
        "detachPeriod": 3,
        "bladeProject": {
            "__typename": "BladeProject",
            "id": "2"
        }
    }
]

export const successfulAllBTDateDataMock = {
    request: {
        query: GET_BT_DATE_INFO,
    },
    result: {
        data: allBladeTaskDateData,
    }
}






