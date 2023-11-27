import React, { useState } from 'react';
import EngineerTable from './EngineerTable';
import EquipmentTable from './EquipmentTable';
import TechnicianTable from './TechnicianTable';
import './Ressource.css';


export default function ResourceTable() {
    //Sanitize string to remove any non-alphanumeric characters

    const [selectedForm, setSelectedForm] = useState<number>(1);

    return (
        <div>
            <h1 className='h1-style'>Select Ressource</h1> 
            <select className='dropdown-container' onChange={(e) => setSelectedForm(parseInt(e.target.value))} value={selectedForm}>
                <option value={1}>Engineer</option>
                <option value={2}>Technician</option>
                <option value={3}>Equipment</option>
            </select>

            {selectedForm === 1 && <EngineerTable/>}
            {selectedForm === 2 && <TechnicianTable/>}
            {selectedForm === 3 && <EquipmentTable/>}
        </div>
    );
}