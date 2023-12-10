import "./BladeTaskMenu.css";
import ProjectSelector from "./ProjectSelector";
import TaskNameSelector from "./TaskNameSelector";
import DurationSelector from "./DurationSelecter";
import StartDateSelector from "./StartDateSelector";
import TestRigSelector from "./TestRigSelector";
import AttachPeriodSelector from "./AttachPeriodSelector";
import DetachPeriodSelector from "./DetachPeriodSelector";
import EquipmentSelectionMenu from "./EquipmentSelector";
import EmployeesMenu from "./EmployeesMenu";
import { ResourceOrderContext } from "./BladeTaskOrderContext";
import { useState, useEffect } from "react";
import { BTOrder, InErrorChart, ResourceOrder, BladeProjectByIdResult, BladeTask} from "./BTMenuTypes";
import EquipmentList from "./EquipmentList";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { ADD_BT, UPDATE_BT_INFO } from "../../api/mutationList";
import { GET_ALL_BT, GET_BP_BY_ID } from "../../api/queryList";
import { ValidateForm } from "./ValidateForm";
import { createEmptyInErrorChart } from "./BTMenuTypes";
import "../CreateBTMenu/TestTypeSelector.css";
import "../CreateBTMenu/BladeTaskMenu.css";
import TestTypeSelector from "./TestTypeSelector";


export interface BladeTaskMenuProps {
    creator: boolean;
    inputs?: BTOrder;
    btId?: number;
}

function BladeTaskMenu(props: BladeTaskMenuProps) {
    const creator = props.creator; //True if creating a new blade task, false if editing an existing one
    //Apollo mutation setup:
    const [addBT, { loading: addLoading, error: addError }] = useMutation(ADD_BT);
    const [updateBT, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_BT_INFO);
    const { loading: btLoading, error: btError, data: btData, refetch } = useQuery(GET_ALL_BT);
    const [getBPById, { error, data: BPInfo }] = useLazyQuery(GET_BP_BY_ID,); //Used to query for BP on submit to check existing BT names

    //All the states for the form -> Inserted into the BT-order as the user fills the form out
    const [bladeProjectId, setBladeProjectId] = useState(creator ? "" : props.inputs!.bladeProjectId);
    const [taskName, setTaskName] = useState(creator ? "" : props.inputs!.taskName);
    const [testType, setTestType] = useState(creator ? "" : props.inputs!.testType);
    const [startDate, setStartDate] = useState(
        creator ? new Date().toISOString().split("T")[0] : convertStartDateFromDB(props.inputs!.startDate, props.inputs!.attachPeriod)
    ); //Sets the date to be the current day as initial value;
    const [duration, setDuration] = useState(creator ? 0 : props.inputs!.duration - props.inputs!.attachPeriod - props.inputs!.detachPeriod);
    const [attachPeriod, setAttachPeriod] = useState(creator ? 0 : props.inputs!.attachPeriod);
    const [detachPeriod, setDetachPeriod] = useState(creator ? 0 : props.inputs!.detachPeriod);
    const [testRig, setTestRig] = useState(creator ? 0 : props.inputs!.testRig);

    const [resourceOrders, setResourceOrder] = useState<ResourceOrder[]>(creator ? [] : props.inputs!.resourceOrders);

    //Tracks which input fields are currently in an error state(Incorrect input has been provided)
    const [inErrorChart, setInErrorChart] = useState({
        bladeProjectId: false,
        taskName: [false, false], //[0]: Taskname exists in the system ; [1]: Used unsuitable character
        testType: false,
        startDate: false,
        duration: false,
        attachPeriod: false,
        detachPeriod: false,
        testRig: false,
        equipment: false,
        employees: false,
    });

    //State for the equipment selection menu
    const [equipmentActive, setEquipmentActive] = useState(false);

    if (updateLoading) {
        return <p>Loading...</p>;
    }
    if (updateError) {
        return <p> Error {updateError.message}</p>;
    }
    if (addLoading) {
        return <p>Loading...</p>;
    }
    if (addError) {
        return <p>Error {addError.message}</p>;
    }
    if (btLoading) {
        return <p>Loading...</p>;
    }
    if (btError) {
        return <p>Error {btError.message}</p>;
    }

    const allBT = btData["AllBladeTasks"];

    //Creates mutation based on the provided input
    //Only triggers when following fields are provided: duration, attachPeriod, detachPeriod, bladeProjectId, taskName, testType
    //Other fields are optional
    const handleSubmit = async () => {
        const result:BladeProjectByIdResult = await getBPById({ variables: { id: currentOrder.bladeProjectId}});
        let BTarray = result.data.BladeProjectById.bladeTasks;
        let BTNames:Array<string> = [];
        if(BTarray.length > 0){
            BTNames = BTarray.map((BladeTask:BladeTask) => BladeTask.taskName);
        }

        const submittedStartDate = new Date(startDate);
        const realStartDate = convertStartDateToDB(submittedStartDate, attachPeriod);
        const dbStartDate = new Date(realStartDate.getFullYear(), realStartDate.getMonth(), realStartDate.getDate() + 1).toISOString().split("T")[0];
        const realEndDate = new Date(realStartDate.getFullYear(), realStartDate.getMonth(), realStartDate.getDate() + duration + attachPeriod + detachPeriod);
        try {
            if (props.creator) {
                if (
                    !checkBTCreationOverlaps(
                        //check if the created blade task overlaps with another blade task
                        allBT,
                        realStartDate,
                        realEndDate,
                        bladeProjectId,
                        testRig
                    )
                ) {
                    if (ValidateForm(currentOrder, inErrorChart, setInErrorChart, BTNames)) {

                        resourceOrders.forEach((order: ResourceOrder) => {
                            order.resourceType = order.resourceType.toLowerCase();
                            order.resourceName = order.resourceName.toLowerCase();
                        })

                        const response = await addBT({
                            //add blade task to database
                            variables: {
                                bladeTask: {
                                    bladeProjectId: bladeProjectId,
                                    taskName: taskName,
                                    testType: testType,
                                    startDate: dbStartDate,
                                    duration: duration,
                                    attachPeriod: attachPeriod,
                                    detachPeriod: detachPeriod,
                                    testRig: testRig,
                                    resourceOrders: resourceOrders,
                                },
                            },
                        });
                        console.log(response);
                    } else {
                        console.log("Required fields have not been filled out");
                    }
                } else {
                    alert("The created Blade Task overlaps with another Blade Task either on the same rig or project");
                }
            } else {
                if (
                    !checkBTEditOverlaps(
                        //check if the edited blade task overlaps with another blade task
                        allBT,
                        realStartDate,
                        realEndDate,
                        parseInt(props.btId ? props.btId.toString() : "NaN"),
                        bladeProjectId,
                        testRig
                    )
                ) {
                    if (ValidateForm(currentOrder, inErrorChart, setInErrorChart, BTNames)) {
                        resourceOrders.forEach((order: ResourceOrder) => {
                            order.resourceType = order.resourceType.toLowerCase();
                            order.resourceName = order.resourceName.toLowerCase();
                        })
                        const response = await updateBT({
                            //update blade task in database
                            variables: {
                                updates: {
                                    bladeProjectId: bladeProjectId,
                                    taskName: taskName,
                                    testType: testType,
                                    startDate: dbStartDate,
                                    duration: duration,
                                    attachPeriod: attachPeriod,
                                    detachPeriod: detachPeriod,
                                    testRig: testRig,
                                    resourceOrders: resourceOrders,
                                },
                                id: parseInt(props.btId ? props.btId.toString() : "NaN"),
                            },
                        });
                        console.log(response);
                    } else {
                        console.log("Required fields have not been filled out");
                    }
                } else {
                    alert("The edited Blade Task overlaps with another Blade Task either on the same rig or project");
                }
            }
        } catch (error) {
            console.log(error);
        }
        refetch();
    };

    //Resets all field to their initial value
    const handleCancellation = (creator: boolean) => {
        setBladeProjectId(creator ? "" : props.inputs!.bladeProjectId);
        setTaskName(creator ? "" : props.inputs!.taskName);
        setTestType(creator ? "" : props.inputs!.testType);
        setStartDate(creator ? new Date().toISOString().split("T")[0] : props.inputs!.startDate);
        setDuration(creator ? 0 : props.inputs!.duration);
        setAttachPeriod(creator ? 0 : props.inputs!.attachPeriod);
        setDetachPeriod(creator ? 0 : props.inputs!.detachPeriod);
        setTestRig(creator ? 0 : props.inputs!.testRig);
        setResourceOrder(creator ? [] : props.inputs!.resourceOrders);

        setInErrorChart(createEmptyInErrorChart());
    };

    //The BTOrder object sent to the server -> Is created as a new Blade Tasks instance in DB and displayed in schedule
    let currentOrder: BTOrder = {
        bladeProjectId: bladeProjectId!,
        taskName: taskName,
        testType: testType,
        startDate: startDate,
        duration: duration,
        attachPeriod: attachPeriod,
        detachPeriod: detachPeriod,
        testRig: testRig,
        resourceOrders: resourceOrders,
    };


    return (
        <div className="btmenu-container">
            {/*ErrorMessageContainer is a menu next to the BT-Menu displaying error messages*/}
            <ErrorMessageContainer inErrorChart={inErrorChart} />

            {/*Each selector is provided the state it controls*/}
            <div className="name_and_project_selection_wrapper">
                <TaskNameSelector taskName={taskName} setTaskName={setTaskName} inErrorChart={inErrorChart} setInErrorChart={setInErrorChart} />
                <ProjectSelector bladeProjectId={bladeProjectId} setBladeProjectId={setBladeProjectId} />
            </div>
            <div className="item testtype_wrapper">
                <h2 className="title">Type</h2>
                <TestTypeSelector
                    testType={testType}
                    setTestType={setTestType}
                    className="testtype_select input_sideborders"
                    inErrorChart={inErrorChart}
                    setInErrorChart={setInErrorChart}
                />
            </div>
            <div className="item date_selection_wrapper">
                <StartDateSelector startDate={startDate} setStartDate={setStartDate} inErrorChart={inErrorChart} setInErrorChart={setInErrorChart} />
                <DurationSelector duration={duration} setDuration={setDuration} inErrorChart={inErrorChart} setInErrorChart={setInErrorChart} />
                <AttachPeriodSelector
                    duration={duration}
                    detachPeriod={detachPeriod}
                    attachPeriod={attachPeriod}
                    setAttachPeriod={setAttachPeriod}
                    inErrorChart={inErrorChart}
                    setInErrorChart={setInErrorChart}
                />
                <DetachPeriodSelector
                    duration={duration}
                    attachPeriod={attachPeriod}
                    detachPeriod={detachPeriod}
                    setDetachPeriod={setDetachPeriod}
                    inErrorChart={inErrorChart}
                    setInErrorChart={setInErrorChart}
                />
                <TestRigSelector testRig={testRig} setTestRig={setTestRig} />
            </div>

            <div className="item equipment_wrapper">
                <h2 className="title equipment">Equipment</h2>

                <div className="title equipment_type">
                    <h2 className="title">Equipment Type</h2>
                </div>

                <div className="title equipment_amount">
                    <h2 className="title">Period</h2>
                </div>
                <ResourceOrderContext.Provider value={setResourceOrder}>
                    <EquipmentList resourceOrders={resourceOrders} key={"Equipment_List"} classNameFor="bt" />
                </ResourceOrderContext.Provider>

                <div className="equipment_interaction">
                    <button className="equipment_add" onClick={(e) => setEquipmentActive(true)}>
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                </div>

                {equipmentActive ? (
                    <ResourceOrderContext.Provider value={setResourceOrder}>
                        <EquipmentSelectionMenu setEquipmentActive={setEquipmentActive} className="bt" />
                    </ResourceOrderContext.Provider>
                ) : (
                    <></>
                )}
            </div>
            <ResourceOrderContext.Provider value={setResourceOrder}>
                <EmployeesMenu resourceOrders={resourceOrders} />
            </ResourceOrderContext.Provider>
            <div className="submit_cancel_wrapper">
                <button
                    className="cancel_BT"
                    onClick={() => {
                        handleCancellation(creator);
                    }}
                >
                    Clear
                </button>
                <button className="submit_BT" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

function ErrorMessageContainer({ inErrorChart }: { inErrorChart: InErrorChart }) {
    return (
        <div className="error_message_wrapper">
            {inErrorChart.testType ? <p className="error_message error_message_test_type">Please provide a test type</p> : <div></div>}
            {inErrorChart.startDate ? <p className="error_message error_message_startdate">Invalid Date - Date is before current date</p> : <div></div>}
            {inErrorChart.duration ? <p className="error_message error_message_duration">Invalid Duration - Cannot Be Negative</p> : <div></div>}
            {inErrorChart.attachPeriod ? <p className="error_message error_message_attachPeriod">Invalid Attach Period - Cannot Be Negative</p> : <div></div>}
            {inErrorChart.detachPeriod ? <p className="error_message error_message_detachPeriod">Invalid Detach Period - Cannot Be Negative</p> : <div></div>}
            {inErrorChart.equipment ? <p className="error_message error_message_equipment">Invalid Equipment</p> : <div></div>}
            {inErrorChart.employees ? <p className="error_message error_message_employee">Invalid Employee</p> : <div></div>}
        </div>
    );
}
export default BladeTaskMenu;

function checkBTEditOverlaps(allBT: any, startDate: Date, endDate: Date, btId: number, projectId: string, rig: number) {
    if (startDate > endDate) {
        console.log("Invalid Date: start date is after end date");
        return true;
    }
    if (isNaN(btId)) {
        console.log("Invalid ID: id is NaN");
        return true;
    }
    for (let i = 0; i < allBT.length; i++) {
        const bt = allBT[i];
        let btStartDate = new Date(bt.startDate);
        let btEndDate = new Date(bt.endDate);

        if (
            parseInt(bt.id) !== btId &&
            (bt.testRig === rig || bt.bladeProject.id === projectId) &&
            ((btStartDate <= endDate && btStartDate >= startDate) ||
                (btEndDate >= startDate && btEndDate <= endDate) ||
                (startDate >= btStartDate && startDate <= btEndDate) ||
                (endDate >= btStartDate && endDate <= btEndDate))
        ) {
            return true;
        }
    }
    return false;
}
function checkBTCreationOverlaps(allBT: any, startDate: Date, endDate: Date, projectId: string, rig: number) {
    let overlaps = false;
    if (startDate > endDate) {
        return true;
    }
    for (let i = 0; i < allBT.length; i++) {
        const bt = allBT[i];
        let btStartDate = new Date(bt.startDate);
        let btEndDate = new Date(bt.endDate);

        if (
            (bt.testRig === rig || bt.bladeProject.id === projectId) &&
            ((btStartDate <= endDate && btStartDate >= startDate) ||
                (btEndDate >= startDate && btEndDate <= endDate) ||
                (startDate >= btStartDate && startDate <= btEndDate) ||
                (endDate >= btStartDate && endDate <= btEndDate))
        ) {
            return true;
        }
    }
    return overlaps;
}

function convertStartDateFromDB(startDate: string, attachPeriod: number) {
    let date = new Date(startDate);
    let newStartDate = date.getDate() + 1 + attachPeriod; //the date is zero indexed
    let realDate = new Date(date.getFullYear(), date.getMonth(), newStartDate).toISOString().split("T")[0];
    return realDate;
}

function convertStartDateToDB(startDate: Date, attachPeriod: number) {
    let date = new Date(startDate);
    let newStartDate = date.getDate() - attachPeriod;
    let realDate = new Date(date.getFullYear(), date.getMonth(), newStartDate);
    return realDate;
}
