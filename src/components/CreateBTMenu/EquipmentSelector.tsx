import "./EquipmentSelector.css";
import { useQuery } from "@apollo/client";
import { GET_EQUIPMENT_TYPES } from "../../api/queryList";
import { useState } from "react";
import { capitalize } from "../../utils/StringEditing";
import { ResourceOrder } from "./BTMenuTypes";
import { useResourceOrderContext } from "./BladeTaskOrderContext";

function EquipmentSelectionMenu({ setEquipmentActive, className }: { setEquipmentActive: Function; className: string }) {
    return (
        <div className={"equipment_menu_wrapper " + className}>
            <h2 className={"equipment_menu_title " + className}>Equipment</h2>
            <button className={"equipment_menu_close " + className} onClick={() => setEquipmentActive(false)}>
                <span className="material-symbols-outlined ">close</span>
            </button>
            <div className={"equipment_menu_items_wrapper " + className}>
                <EquipmentListGenerator className={className} />
            </div>
        </div>
    );
}

function EquipmentListGenerator({ className }: { className: string }) {
    const { loading, error, data } = useQuery(GET_EQUIPMENT_TYPES);

    if (loading) return <div className="equipment_menu_item">LOADING</div>;

    if (error) {
        console.log(error.message);
        return <div className="equipment_menu_item">ERROR</div>;
    }

    //Returns a dropdown of all the test types present in DB
    return data.GetEquipmentTypes.map((type: string) => <EquipmentMenuItem resourceName={type} className={className} />);
}

function EquipmentMenuItem({ resourceName, className }: { resourceName: string; className: string }) {
    const changeResourceOrder = useResourceOrderContext();
    return (
        <div className={"equipment_menu_item " + className}>
            <button
                className={"equipment_menu_item_button " + className}
                onClick={() => changeResourceOrder((prevResourceOrder: ResourceOrder[]) => EquipmentMenuItemLogic(prevResourceOrder, resourceName))}
            >
                <span className={"equipment_menu_item_icon material-symbols-outlined " + className}>add_circle</span>
            </button>
            <h2 className={"equipment_menu_item_title " + className}>{capitalize(resourceName)}</h2>
        </div>
    );
}

function EquipmentMenuItemLogic(prevResourceOrder: ResourceOrder[], resourceName: string) {
    return [
        ...prevResourceOrder,
        {
            resourceType: "Equipment",
            resourceName: resourceName,
            equipmentAssignmentStatus: [true, true],
            workHours: 0,
        },
    ];
}

export default EquipmentSelectionMenu;
