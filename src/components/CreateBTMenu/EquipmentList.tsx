import React, { useState } from "react";
import "./EquipmentList.css";
import { ResourceOrder } from "./BTMenuTypes";
import { useResourceOrderContext } from "./BladeTaskOrderContext";


function EquipmentList({ resourceOrders, classNameFor}: { resourceOrders: ResourceOrder[], classNameFor:string}) {
    const changeResourceOrder = useResourceOrderContext();

    const handleOrderRemoval = (index: number) => {
        // Remove the order at the specified index
        const updatedOrders = [...resourceOrders];
        updatedOrders.splice(index, 1);
        changeResourceOrder(updatedOrders);
    };

    return (
        <div className={"equipment_list " + classNameFor}>
            {resourceOrders.map((order) => (
                <React.Fragment key={resourceOrders.indexOf(order)}> 
                {((order.resourceType.toLowerCase() !== "engineer") && (order.resourceType.toLowerCase() !== "technician")) ?
                <div className={'equipment_entry ' + classNameFor}>
                    <div className={'type ' + classNameFor}>
                        <h2 className={'title ' + classNameFor}>{order.resourceName}</h2>
                    </div>
                    <div className={"period " + classNameFor}>
                        <fieldset className={'period_selector ' + classNameFor}>
                            <CheckBox key={resourceOrders.indexOf(order) + "a"} name="attachPeriod" resource={order} resourceIndex={resourceOrders.indexOf(order)} title="Attach"/>
                            <CheckBox key={resourceOrders.indexOf(order) + "b"} name="detachPeriod" resource={order} resourceIndex={resourceOrders.indexOf(order)} title="Detach"/>
                        </fieldset>
                        <button className={'remove_equipment_button ' + classNameFor} onClick={() => handleOrderRemoval(resourceOrders.indexOf(order))}><span className="material-symbols-outlined">cancel</span></button>
                    </div>
                </div>
                :
                <></>
                }
                </React.Fragment>
            ))}
        </div>
    );
}

function CheckBox({
    name,
    resource,
    resourceIndex,
    title,
}: {
    name: string;
    resource: ResourceOrder;
    resourceIndex: number;
    title: string;
}) {
    const [checked, setChecked] = useState(true);
    const changeResourceOrder = useResourceOrderContext();

    const handleCheckInput = () => {
        setChecked(!checked);
        changeResourceOrder((prevResourceOrders: ResourceOrder[]) => {
            let newResourceOrders = [...prevResourceOrders];
            let currentAssignmentStatus: Array<boolean> =
                newResourceOrders[resourceIndex].equipmentAssignmentStatus;
            if (title === "Attach") {
                currentAssignmentStatus[0] = !checked;
            }
            if (title === "Detach") {
                currentAssignmentStatus[1] = !checked;
            }
            newResourceOrders[resourceIndex].equipmentAssignmentStatus =
                currentAssignmentStatus;
            return newResourceOrders;
        });
    };

    return (
        <div className="checkBox">
            {title === "Attach" ? (
                <input
                    type="checkbox"
                    id={name + resourceIndex}
                    name={name + resourceIndex}
                    checked={resource.equipmentAssignmentStatus[0]}
                    onChange={handleCheckInput}
                />
            ) : (
                <input
                    type="checkbox"
                    id={name + resourceIndex}
                    name={name + resourceIndex}
                    checked={resource.equipmentAssignmentStatus[1]}
                    onChange={handleCheckInput}
                />
            )}
            <label htmlFor={name + resourceIndex}>{title}</label>
        </div>
    );
}

export default EquipmentList;
