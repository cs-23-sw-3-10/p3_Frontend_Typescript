import BladeTaskMenu from "../CreateBTMenu/BladeTaskMenu";
import TestRigSelector from "../CreateBTMenu/TestRigSelector";
import { BladeTaskCardProps } from "../Schedule/BladeTaskCard";
import { BladeTaskMenuProps } from "../CreateBTMenu/BladeTaskMenu";
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
    if (bladeTask.bookings.length > 0) {
        bladeTask.bookings.forEach((booking: any) => {
            newResourceOrders.push({
                resourceType: booking.resourceType,
                resourceName: booking.resourceName,
                equipmentAssignmentStatus: [true, true],
                workHours: booking.workHours,
            });
        });
    }

    console.log("bladeTask.resourceOrders", bladeTask.resourceOrders);
    console.log("newResourceOrders", newResourceOrders);

    const inputs: BTOrder = {
        bladeProjectId: bladeTask.bladeProject.id,
        taskName: bladeTask.taskName,
        testType: bladeTask.testType,
        startDate: bladeTask.startDate,
        duration: bladeTask.duration,
        attachPeriod: bladeTask.attachPeriod,
        detachPeriod: bladeTask.detachPeriod,
        testRig: bladeTask.testRig,
        resourceOrders: [...bladeTask.resourceOrders, ...newResourceOrders],
    }

  return (
    <div className="EditBTComponent">
        <BladeTaskMenu creator={false} inputs={inputs} btId={BT.bladeTaskID}/>
    </div>
  );
}
export default EditBTComponent;





















{/* <form>
        <label htmlFor="taskName">Task Name:</label>
        <input type="text" id="taskName" name="taskName" />
        <br />
        <label htmlFor="attachPeriod">Attach Period:</label>
        <input type="number" id="attachPeriod" name="attachPeriod" />
        <br />
        <label htmlFor="detachPeriod">Detach Period:</label>
        <input type="number" id="detachPeriod" name="detachPeriod" />
        <br />
        <label htmlFor="taskDescription">Task Description:</label>
        <input type="text" id="taskDescription" name="taskDescription" />
        <br />
        <label htmlFor="taskType">Task Type:</label>
        <input type="text" id="taskType" name="taskType" />
        <br />
        <label htmlFor="taskPriority">Task Priority:</label>
        <input type="text" id="taskPriority" name="taskPriority" />
        <br />
        <label htmlFor="taskStatus">Task Status:</label>
        <input type="text" id="taskStatus" name="taskStatus" />
        <br />
        <label htmlFor="taskOwner">Task Owner:</label>
        <input type="text" id="taskOwner" name="taskOwner" />
        <br />
        <label htmlFor="taskRig">Task Location:</label>
        <input type="text" id="taskRig" name="taskRig" />
        <br />
        <label htmlFor="taskDuration">Task Duration:</label>
        <input type="number" id="taskDuration" name="taskDuration" />
        <br />
        <label htmlFor="taskStartTime">Task Start Time:</label>
        <input type="time" id="taskStartTime" name="taskStartTime" />
        <br />
        <label htmlFor="taskEndTime">Task End Time:</label>
        <input type="time" id="taskEndTime" name="taskEndTime" />
        <br />
        <label htmlFor="taskDate">Task Date:</label>
        <input type="date" id="taskDate" name="taskDate" />
        <br />
        <label htmlFor="taskNotes">Task Notes:</label>
        <input type="text" id="taskNotes" name="taskNotes" />
        <br />

        </form> */}