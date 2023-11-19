import './BladeTaskMenu.css';
import TaskNameSelector from './TaskNameSelector';
import TestTypeSelector from './TestTypeSelector';
import TestRigOptions from './TestRigSelector';
import StartDateSelector from './StartDateSelector';
import EquipmentSelectionMenu from './EquipmentSelector';
import EmployeesMenu from './EmployeesMenu';
import { ResourceOrderContext } from './BladeTaskOrderContext';
import React, { useState, useEffect } from 'react';
import { BTOrder, InErrorChart, ResourceOrder } from './BTMenuTypes'
import EquipmentList from './EquipmentList';

function handleDurationChange(e: React.FormEvent<HTMLInputElement>, setDuration: Function) {
    setDuration(e.currentTarget.value);
}

function BladeTaskMenu() {
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
        ResourceOrders: []
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
    }, [startDate])

    return (
        <div className='btmenu-container'>
            <TaskNameSelector setBTName={setBTName}/>
            <TestTypeSelector setTestType={setType}/>

            <div className='item date_selection_wrapper'>
                <StartDateSelector startDate={startDate} setStartDate={setStartDate} inErrorChart={inErrorChart} setInErrorChart={setInErrorChart}/>
                <h2 className="title">{"Duration(Days)"}</h2>
                <input
                    type="number"
                    className="item duration_select"
                    name="duration_select"
                    placeholder='Days'
                    min={0}
                    onChange={(e) => handleDurationChange(e, setDuration)}
                />

                <h2 className="title">Test Rig</h2>

                <select id="testrig" name="testrig">
                    <TestRigOptions />
                </select>

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
        </div>
    );
}

export default BladeTaskMenu;