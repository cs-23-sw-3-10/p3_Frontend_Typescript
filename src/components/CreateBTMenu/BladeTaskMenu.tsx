import './BladeTaskMenu.css';
import TestTypeSelector from './TestTypeSelector';
import TestRigSelector from './TestRigSelector';
import React, {Component} from 'react';

function BladeTaskMenu(){
        return (
            <div className='btmenu-container'>
                <input className='item id_select' type="text" placeholder='Select Task Name'/>
                
                <TestTypeSelector/>
    
                <div className='item date_selection_wrapper'>
                    <h2 className='title'>Start Date</h2>
                    <input type="date" className="startdate_select" />
                
                    <h2 className="title">Duration</h2>
                    <input type="number" className="item duration_select" />
                
                    <h2 className="title">Test Rig</h2>
                    <TestRigSelector/>
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
                        <span className="material-symbols-outlined badge">badge</span>
                        <h2 className="title employee">Employees</h2>
                        <p className='expand'><span className="material-symbols-outlined expand">expand_circle_right</span></p>
                    </div>
                    <div className='employee_list'>
                        <div className='employee_entry'>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
}
 
export default BladeTaskMenu;