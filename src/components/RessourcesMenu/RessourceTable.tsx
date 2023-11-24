import React, { useState } from 'react';
import EngineerTable from './EngineerTable';
import EquipmentTable from './EquipmentTable';
import TechnicianTable from './TechnicianTable';

export default function ResourceTable() {
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

{/*import React, { useState } from 'react';
import './EmployeeMenu.css';
import { get } from 'http';

// Define the type for the DropdownSelector props
interface DropdownSelectorProps {
    input: string[];
    onSelect: (value: string) => void; // Add onSelect prop
}

interface EngineerFormData {
    name : string;
    maxWorkHours : number;
}
interface TechnicianFormData {
    type : string;
    count : number;
    maxWorkHours : number;
}
interface EquipmentFormData {
    type : string;
    calibrationExpirationDate: String;
    name : string;
}
function DropdownSelector({ input, onSelect }: DropdownSelectorProps) {
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
        onSelect(e.target.value);
    }
    
    //get selected option
    const getSelectedOption = () => {
        return selectedOption;
    }

    const renderOptions = () => {
        return input.map((option) => (
            <option key={option} value={option}>{option}</option>
        ));
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleSelect}>
                {renderOptions()}
            </select>
        </div>
    );
}

function AddResourceTable() {

    const renderContent = () => {
        switch (DropdownSelector) {
            case 'Engineer':
                return <div>Engineer</div>;
            case 'Technician':
                return <div>Technician</div>;
            case 'Equipment':
                return <div>Equipment</div>;
            default:
                return <div>Select a value</div>;
        }
    };

    return (
        <>
            <div className='EmployeeOuterContainer'>
                <h1>Resource Menu</h1>
                <DropdownSelector 
                    input={["Engineer", "Technician", "Equipment"]}
                    onSelect={handleSelect}
                />
                {renderContent()}
            </div>
        </>
    );
}

export default AddResourceTable;

*/}