import './BladeTaskMenu.css';
import ProjectSelector from './ProjectSelector';
import TaskNameSelector from './TaskNameSelector';
import TestTypeSelector from './TestTypeSelector';
import DurationSelector from './DurationSelecter';
import StartDateSelector from './StartDateSelector';
import TestRigSelector from './TestRigSelector';
import AttachPeriodSelector from './AttachPeriodSelector';
import DetachPeriodSelector from './DetachPeriodSelector';
import EquipmentSelectionMenu from './EquipmentSelector';
import EmployeesMenu from './EmployeesMenu';
import { ResourceOrderContext } from './BladeTaskOrderContext';
import { useState } from 'react';
import { BTOrder, InErrorChart } from './BTMenuTypes'
import EquipmentList from './EquipmentList';
import { useMutation } from '@apollo/client';
import { ADD_BT, UPDATE_BT_INFO } from '../../api/mutationList';
import { ValidateForm } from './ValidateForm';

export interface BladeTaskMenuProps {
    creator: boolean;
    inputs?: BTOrder;
    btId?: number;
}

function BladeTaskMenu(props: BladeTaskMenuProps) {
    const creator = props.creator;
    //Apollo mutation setup:
    const [addBT, {loading: addLoading, error: addError}] = useMutation(ADD_BT);
    const [updateBT, {loading: updateLoading, error: updateError }] = useMutation(UPDATE_BT_INFO);
   
    //All the states for the form -> Inserted into the BT-order as the user fills the form out
    const [bladeProjectId, setBladeProjectId] = useState(creator ? '' : props.inputs!.bladeProjectId);
    const [taskName, setTaskName] = useState(creator ? '' : props.inputs!.taskName);
    const [testType, setTestType] = useState(creator ? '' : props.inputs!.testType);
    const [startDate, setStartDate] = useState(creator ? new Date().toISOString().split('T')[0] : props.inputs!.startDate); //Sets the date to be the current day as initial value;
    const [duration, setDuration] = useState(creator ? 0 : props.inputs!.duration);
    const [attachPeriod, setAttachPeriod] = useState(creator ? 0 : props.inputs!.attachPeriod);
    const [detachPeriod, setDetachPeriod] = useState(creator ? 0 : props.inputs!.detachPeriod);
    const [testRig, setTestRig] = useState(creator ? 0 : props.inputs!.testRig);
    const [resourceOrders, setResourceOrder] = useState(creator ? [] : props.inputs!.resourceOrders);

    //Tracks which input fields are currently in an error state(Incorrect input has been provided)
    const [inErrorChart, setInErrorChart] = useState({
        bladeProjectId: false,
        taskName: false,
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
        return <p style={{backgroundColor: "rgb(255, 0, 0, 100"}}>Error {updateError.message}</p>;
    }
    if (addLoading) {
        return <p>Loading...</p>;
    }
    if (addError) {
        return <p>Error {addError.message}</p>;
    }


    //Creates mutation based on the provided input
    //Only triggers when following fields are provided: duration, attachPeriod, detachPeriod, bladeProjectId, taskName, testType
    //Other fields are optional
    const handleSubmit = async () => {
        try {
            if (props.creator){
                if (ValidateForm(currentOrder)) {
                    const response = await addBT({
                        variables: {
                            bladeTask: {
                                bladeProjectId: bladeProjectId,
                                taskName: taskName,
                                testType: testType,
                                startDate: startDate,
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
            }
            else{
                if(ValidateForm(currentOrder)){
                    const response = await updateBT({
                        variables: {
                            updates: {
                                bladeProjectId: bladeProjectId,
                                taskName: taskName,
                                testType: testType,
                                startDate: startDate,
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
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Resets all field to their initial value
    const handleCancellation = (creator: boolean) => {
        setBladeProjectId(creator ? "" : props.inputs!.bladeProjectId);
        setTaskName(creator ? "" : props.inputs!.taskName);
        setTestType(creator ? "" : props.inputs!.testType);
        setStartDate(creator ? new Date().toISOString().split('T')[0] : props.inputs!.startDate);
        setDuration(creator ? 0 : props.inputs!.duration);
        setAttachPeriod(creator ? 0 : props.inputs!.attachPeriod);
        setDetachPeriod(creator ? 0 : props.inputs!.detachPeriod);
        setTestRig(creator ? 0 : props.inputs!.testRig);
        setResourceOrder(creator ? [] : props.inputs!.resourceOrders);
    }

    //The BTOrder object sent to the server -> Is created as a new Blade Tasks instance in DB and displayed in schedule
    let currentOrder: BTOrder =
    {
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
        <div className='btmenu-container'>
            {/*ErrorMessageContainer is a menu next to the BT-Menu displaying error messages*/}
            <ErrorMessageContainer inErrorChart={inErrorChart}/>

             {/*Each selector is provided the state it controls*/}
            <div className='name_and_project_selection_wrapper'>
                <TaskNameSelector taskName={taskName} setTaskName={setTaskName} inErrorChart={inErrorChart} setInErrorChart={setInErrorChart}/>
                <ProjectSelector bladeProjectId={bladeProjectId} setBladeProjectId={setBladeProjectId}/>
            </div>

            <TestTypeSelector testType={testType} setTestType={setTestType}/>

            <div className='item date_selection_wrapper'>
                <StartDateSelector 
                    startDate={startDate} 
                    setStartDate={setStartDate} 
                    inErrorChart={inErrorChart} 
                    setInErrorChart={setInErrorChart}
                />
                <DurationSelector 
                    duration={duration} 
                    setDuration={setDuration} 
                    inErrorChart={inErrorChart} 
                    setInErrorChart={setInErrorChart}
                />
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
                <TestRigSelector testRig={testRig} setTestRig={setTestRig}/>
            </div>

            <div className='item equipment_wrapper'>
                <h2 className='title equipment'>Equipment</h2>

                <div className='title equipment_type'>
                    <h2 className='title'>Equipment Type</h2>
                </div>

                <div className='title equipment_amount'>
                    <h2 className='title'>Period</h2>
                </div>
                <ResourceOrderContext.Provider value={setResourceOrder}>
                    <EquipmentList resourceOrders={resourceOrders} key={"Equipment_List"}/>
                </ResourceOrderContext.Provider>

                <div className="equipment_interaction">
                    <button className='equipment_add' onClick={(e) => setEquipmentActive(true)}>
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                </div>

                {equipmentActive
                    ?
                    <ResourceOrderContext.Provider value={setResourceOrder}>
                        <EquipmentSelectionMenu setEquipmentActive={setEquipmentActive} />
                    </ResourceOrderContext.Provider>
                    :
                    <></>
                }
            </div>
            <ResourceOrderContext.Provider value={setResourceOrder}>
                <EmployeesMenu resourceOrders={resourceOrders} />
            </ResourceOrderContext.Provider>
        <div className='submit_cancel_wrapper'>
            <button className="cancel_BT" onClick={() => {handleCancellation(creator)}}>Cancel</button>
            <button className="submit_BT" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    );
}

function ErrorMessageContainer({inErrorChart}:{inErrorChart:InErrorChart}){
    return(
    <div className='error_message_wrapper'>
        {inErrorChart.taskName ? <p className='error_message error_message_btname'>Invalid Name - Task name exists in system</p> : <div></div>}
        {inErrorChart.startDate ? <p className='error_message error_message_startdate'>Invalid Date - Date is before current date</p> : <div></div>}
        {inErrorChart.duration ? <p className='error_message error_message_duration'>Invalid Duration - Cannot Be Negative</p> : <div></div>}
        {inErrorChart.attachPeriod ? <p className='error_message error_message_attachPeriod'>Invalid Attach Period - Cannot Be Negative</p> : <div></div>}
        {inErrorChart.detachPeriod ?  <p className='error_message error_message_detachPeriod'>Invalid Detach Period - Cannot Be Negative</p> : <div></div>}
        {inErrorChart.equipment ? <p className='error_message error_message_equipment'>Invalid Equipment</p> : <div></div>}
        {inErrorChart.employees ? <p className='error_message error_message_employee'>Invalid Employee</p> : <div></div>}
    </div>
    );
}

export default BladeTaskMenu;