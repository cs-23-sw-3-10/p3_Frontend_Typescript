import React, { useState } from 'react';
import EngineerTable from './EngineerTable';
import EquipmentTable from './EquipmentTable';
import TechnicianTable from './TechnicianTable';
import './Ressource.css'

export default function ResourceTable() {
    return (
        <div>
            <h1 className='h1-style'>
                Add a ressource to the database by completing its information.
                
            </h1>
            <h2 className=''>Guide:</h2>
            <p className='p-style'>
                To add a new type of technician or equipment, simply write a different name in the type field.
                <br/>
                Please update the page after adding a ressource to view it in the ComboBox
                
            </p>
            <div style={{ display: 'flex' }}>
                <EngineerTable/>
                <TechnicianTable/>
                <EquipmentTable/>
            </div>
        </div>
    );
}
            /*
            const [selectedForm, setSelectedForm] = useState<number>(1);
            <select className='dropdown-container' onChange={(e) => setSelectedForm(parseInt(e.target.value))} value={selectedForm}>
                <option value={1}>Engineer</option>
                <option value={2}>Technician</option>
                <option value={3}>Equipment</option>
            </select>

            {selectedForm === 1 && <EngineerTable/>}
            {selectedForm === 2 && <TechnicianTable/>}
            {selectedForm === 3 && <EquipmentTable/>}
            */