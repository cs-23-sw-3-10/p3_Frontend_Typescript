import React, { useState } from 'react';
import './EquipmentList.css';
import { ResourceOrder } from './BTMenuTypes';

function EquipmentList({ resourceOrders }: { resourceOrders: ResourceOrder[] }) {
    return (
        <div className="equipment_list">
            {resourceOrders.map((order) => (
                <div className='equipment_entry'>
                    <div className='type'>
                        <h2 className='title'>{order.ResourceType}</h2>
                    </div>
                    <div className="period">
                        <fieldset className='period_selector'>
                            <CheckBox name="attachPeriod" resourceIndex={resourceOrders.indexOf(order)} title="Attach" key={resourceOrders.indexOf(order)}/>
                            <CheckBox name="testPeriod" resourceIndex={resourceOrders.indexOf(order)} title="Test" key={resourceOrders.indexOf(order)}/>
                            <CheckBox name="detachPeriod" resourceIndex={resourceOrders.indexOf(order)} title="Detach" key={resourceOrders.indexOf(order)}/>
                        </fieldset>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CheckBox({name,resourceIndex, title}:{name:string,resourceIndex:number, title:string}) {
    const [checked, setChecked] = useState(false);
    
    return (
        <div className='checkBox'>
            <input
                type="checkbox"
                id={name + resourceIndex}
                name={name + resourceIndex}
                checked={checked}
                onChange={(e) => handleCheckInput(checked, setChecked)}
            />
            <label htmlFor={name + resourceIndex}>{title}</label>
        </div>
    );
}

function handleCheckInput(checked: boolean, setChecked: Function) {
    setChecked(!checked);
}

export default EquipmentList;