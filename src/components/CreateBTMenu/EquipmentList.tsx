import React, { useState } from 'react';
import './EquipmentList.css';
import { ResourceOrder } from './BTMenuTypes';
import { useResourceOrderContext } from './BladeTaskOrderContext';
import { couldStartTrivia } from 'typescript';


function EquipmentList({ resourceOrders }: { resourceOrders: ResourceOrder[] }) {
    const changeResourceOrder = useResourceOrderContext;
    /*
    const handleOrderRemoval = (order:ResourceOrder) => {
        changeResourceOrder((prevResourceOrder: ResourceOrder[]) => {console.log("WHAT THE HELL")});
    }
    */
    
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
                        <button className='remove_equipment_button'><span className="material-symbols-outlined">cancel</span></button>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}

function CheckBox({name,resourceIndex, title}:{name:string,resourceIndex:number, title:string}) {
    const [checked, setChecked] = useState(false);
    const changeResourceOrder = useResourceOrderContext();

    const handleCheckInput = () => {
        setChecked(!checked);
        changeResourceOrder((prevResourceOrder: ResourceOrder[]) => {
            let newResourceOrder = [...prevResourceOrder];
            if (title === "Attach") {
                newResourceOrder[resourceIndex].Period[0] = !checked;
            }
            if (title === "Test") {
                newResourceOrder[resourceIndex].Period[1] = !checked;
            }
            if (title === "Detach") {
                newResourceOrder[resourceIndex].Period[2] = !checked;
            }
            return newResourceOrder;
        });
    };

    return (
        <div className='checkBox'>
            <input
                type="checkbox"
                id={name + resourceIndex}
                name={name + resourceIndex}
                checked={checked}
                onChange={handleCheckInput}
            />
            <label htmlFor={name + resourceIndex}>{title}</label>
        </div>
    );
}

export default EquipmentList;