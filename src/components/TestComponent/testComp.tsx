import { GET_ALL_BT } from "../../api/queryList";
import { useQuery } from "@apollo/client";
import "./testComp.css";

export default function DisplayAllBladeTasks() {
    const { loading, error, data } = useQuery(GET_ALL_BT);

    if (loading) return console.log("Loading");
    if (error) return console.log("Error");

    return data.AllBladeTasks.map(
        ({
            id,
            taskName,
            testType,
            testRig,
            attachPeriod,
            detachPeriod,
            duration,
            startDate,
            endDate,
            project,
        }: {
            id: string;
            taskName: string;
            testType: string;
            testRig: number;
            attachPeriod: number;
            detachPeriod: number;
            duration: number;
            startDate: number;
            endDate: number;
            project: { id: string };
        }) => (
            <div className="test_BT" key={id}>
                <ul>
                    <li>Task Name {taskName}</li>
                    <li>Task Type {testType}</li>
                    <li>Test Rig {testRig}</li>
                    <li>Attach Period {attachPeriod}</li>
                    <li>Detach Period {detachPeriod}</li>
                    <li>Detach Period {duration}</li>
                    <li>Start Date {startDate}</li>
                    <li>End Date {endDate}</li>
                </ul>
            </div>
        )
    );
}
