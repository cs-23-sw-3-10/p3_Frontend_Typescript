import React, { useState } from 'react';
import EngineerTable from './EngineerTable';
import EquipmentTable from './EquipmentTable';
import TechnicianTable from './TechnicianTable';
import './Ressource.css'

export default function ResourceTable() {
    return (
        <div>
            <h1 className='h1-style'>
                Add a resource to the database by completing its information.
            </h1>

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