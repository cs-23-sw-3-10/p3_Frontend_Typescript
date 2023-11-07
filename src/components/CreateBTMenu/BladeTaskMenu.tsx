import './BladeTaskMenu.css';
import React, {useState} from 'react';

const BladeTaskMenu = () => {
    return (
        <div className='btmenu-container'>
            <input className='item id_select' type="text" placeholder='Select Task Name'/>

            <div className="item testtype_wrapper">
                <h2 className="title">Type</h2>
                <select className="testtype_select" id="testtype" name="testtype">
                    <option value="fsp_test">Flapwise Static Proof</option>
                    <option value="esp_test">Edgewise Static Proof</option>
                    <option value="pfs_test">Post Fatigue Static</option>
                    <option value="ff_test">Flapwise Fatigue</option>
                    <option value="ef_test">Edgewise Fatigue</option>
                </select>
            </div>

            <div className='item date_selection_wrapper'>
                <h2 className='title'>Start Date</h2>
                <input type="date" className="startdate_select" />
            
                <h2 className="title">Duration</h2>
                <input type="number" className="item duration_select" />
            
                <h2 className="title">Test Rig</h2>
                <select id="testrig" name="testrig">
                    <option value="tr1">Test Rig 1</option>
                    <option value="tr2">Test Rig 2</option>
                    <option value="tr3">Test Rig 3</option>
                    <option value="tr4">Test Rig 4</option>
                    <option value="tr5">Test Rig 5</option>
                    <option value="tr5">Test Rig 6</option>
                </select>
            </div>

            <div className='item equipment_wrapper'>
                <h2 className='title equipment'>Equipment</h2>

                <div className='title equipment_type'>
                    <h2 className='title'>Equipment Type</h2>
                </div>

                <div className='title equipment_amount'>
                    <h2 className='title'>Equipment Amount</h2>
                </div>

                <div className="equipment_list">
                    <div className='equipment_entry'>
                        <div className='type'>
                            <h2 className='title'>A</h2>
                        </div>
                        <div className="amount">
                            <h2 className="title">2</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="item employees_wrapper">
                <h2 className='title staff'>Staff</h2>
                <div className='employee_select'>
                    <h2 className="title">Employees</h2>
                </div>
            </div>
        </div>
    );
}
 
export default BladeTaskMenu;