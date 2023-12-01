import BladeTaskMenu from "../CreateBTMenu/BladeTaskMenu";
import { BTOrder, ResourceOrder } from "../CreateBTMenu/BTMenuTypes";
import { useQuery } from "@apollo/client";
import { GET_BT_WITH_ID } from "../../api/queryList";

interface EditBTComponentProps {
    bladeTaskID: number;
}

function EditBTComponent(BT: EditBTComponentProps) {
    const { loading, error, data } = useQuery(GET_BT_WITH_ID, {
        variables: { id: parseInt(BT.bladeTaskID.toString()) },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error {error.message}</p>;

    const bladeTask = data["BladeTaskById"];

    let newResourceOrders: Array<ResourceOrder> = [];
    bladeTask.resourceOrders.forEach(
        ({
            resourceName,
            resourceType,
            workHours,
            equipmentAssignmentStatus,
        }: {
            resourceName: string;
            resourceType: string;
            workHours: number;
            equipmentAssignmentStatus: boolean[];
        }) => {
            newResourceOrders.push({
                resourceName: resourceName,
                resourceType: resourceType,
                workHours: workHours,
                equipmentAssignmentStatus: [...equipmentAssignmentStatus],
            });
        }
    );

    const inputs: BTOrder = {
        bladeProjectId: bladeTask.bladeProject.id,
        taskName: bladeTask.taskName,
        testType: bladeTask.testType,
        startDate: bladeTask.startDate,
        duration: bladeTask.duration,
        attachPeriod: bladeTask.attachPeriod,
        detachPeriod: bladeTask.detachPeriod,
        testRig: bladeTask.testRig,
        resourceOrders: newResourceOrders,
    };

    return (
        <div className="EditBTComponent">
            <BladeTaskMenu
                creator={false}
                inputs={inputs}
                btId={BT.bladeTaskID}
            />
        </div>
    );
}
export default EditBTComponent;
