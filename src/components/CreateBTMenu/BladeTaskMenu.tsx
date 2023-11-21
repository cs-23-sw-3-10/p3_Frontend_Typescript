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
import React, { useState, useEffect } from 'react';
import { BTOrder, InErrorChart, ResourceOrder } from './BTMenuTypes'
import EquipmentList from './EquipmentList';
import { useMutation } from '@apollo/client';
import { ADD_BT } from '../../api/mutationList';
import { ValidateForm } from './ValidateForm';


function BladeTaskMenu() {
    //Apollo mutation setup:
    const [addBT, {loading, error }] = useMutation(ADD_BT);

    const handleSubmit = () => {
        if(ValidateForm(currentOrder)){
            addBT({variables:{
                bladeTask:{
                    bladeProjectId: project,
                    taskName: BTName,
                    testType: type,
                    startDate: startDate,
                    duration: duration,
                    attachPeriod: attachPeriod,
                    detachPeriod: detachPeriod,
                    testRig: testRig,
                    resourceOrders: resourceOrders,
                }
            }}).then((response) => console.log(response));
        }else console.log("Required fields have not been filled out");
    }

    const handleCancellation = () => {
        setProject("");
        setBTName("");
        setType("");
        setStartDate(new Date().toISOString().split('T')[0]);
        setDuration(0);
        setAttachPeriod(0);
        setDetachPeriod(0);
        setTestRig(0);
        setResourceOrder([]);
    }
    
    //All the states for the form -> Inserted into the BT-order as the user fills it out
    const [project, setProject] = useState('');
    const [BTName, setBTName] = useState('');
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); //Sets the date to be the current day as initial value;
    const [duration, setDuration] = useState(0);
    const [attachPeriod, setAttachPeriod] = useState(0);
    const [detachPeriod, setDetachPeriod] = useState(0);
    const [testRig, setTestRig] = useState(0);
    const [resourceOrders, setResourceOrder] = useState([]);

    //State for the equipment selection menu
    const [equipmentActive, setEquipmentActive] = useState(false);

    //The BTOrder object sent to the server -> Creates a new instance in the DB
    let currentOrder: BTOrder =
    {
        Project: project,
        BTName: BTName,
        Type: type,
        StartDate: startDate,
        Duration: duration,
        AttachPeriod: attachPeriod,
        DetachPeriod: detachPeriod,
        TestRig: testRig,
        ResourceOrders: resourceOrders,
    };

    const [inErrorChart, setInErrorChart] = useState({
        BTName: false,
        Type: false,
        StartDate: false,
        Duration: false,
        AttachPeriod: false,
        DetachPeriod: false,
        TestRig: false,
        Equipment: false,
        Employees: false,
    });

    useEffect(() => {
        console.log(currentOrder);
    }, [project, BTName, type, startDate, duration, attachPeriod, detachPeriod, testRig, resourceOrders])

   

    return (
        <div className='btmenu-container'>
            <div className='name_and_project_selection_wrapper'>
                <ProjectSelector setProject={setProject}/>
                <TaskNameSelector setBTName={setBTName}/>
            </div>

            <TestTypeSelector setTestType={setType}/>

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
                <TestRigSelector setTestRig={setTestRig}/>
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
                    <EquipmentList resourceOrders={resourceOrders} />
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
            <button className="cancel_BT" onClick={handleCancellation}>Cancel</button>
            <button className="submit_BT" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    );
}

export default BladeTaskMenu;