import React, { useState } from 'react';
import EngineerTable from './EngineerTable';
import EquipmentTable from './EquipmentTable';
import TechnicianTable from './TechnicianTable';
import './Ressource.css'

export default function ResourceTable() {
    return (
        <div className='resource-table-container'>
            <h1 className='h1-style'> Ressources</h1>
            <h2 className='h2-style'>Add, update or remove a ressource to/from the database</h2>
            <p className='p-style'>
                To <b>add</b> a new type, name ect. simply overwrite the text in the dropdown menu. <br/>
                To <b>update</b>, select the specific ressource in the dropdown you want to update and overwrite the variables<br/>
                To <b>delete</b>, select the specific ressource in the dropdown you want to delete and press the delete button
                
            </p>
            <div className="tables-container">
                <div className="engineer-table">
                    <EngineerTable/>
                </div>
                <div className="technician-table">
                    <TechnicianTable/>
                </div>
                <div className="equipment-table">
                    <EquipmentTable/>
                </div>
            </div>
        </div>
    );
}