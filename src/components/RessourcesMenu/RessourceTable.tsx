import React, { useState } from 'react';
import EngineerTable from './EngineerTable';
import EquipmentTable from './EquipmentTable';
import TechnicianTable from './TechnicianTable';

export default function ResourceTable() {
    //Sanitize string to remove any non-alphanumeric characters
    const sanitizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9_ -]/g, '');
    }
    
    const [selectedForm, setSelectedForm] = useState<number>(1);

    return (
        <div>
        <select onChange={(e) => setSelectedForm(parseInt(e.target.value))} value={selectedForm}>
            <option value={1}>Engineer</option>
            <option value={2}>Technician</option>
            <option value={3}>Equipment</option>
        </select>

        {selectedForm === 1 && <EngineerTable/>}
        {selectedForm === 2 && <TechnicianTable/>}
        {selectedForm === 3 && <EquipmentTable/>}
        </div>
    );
};