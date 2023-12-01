import './EquipmentSelector.css'
import { empty, useQuery } from '@apollo/client';
import { GET_ALL_EQUIPMENT_TYPES } from '../../api/queryList';
import React, { SetStateAction, useContext, useState } from 'react';
import { ResourceOrder } from './BTMenuTypes';
import { useResourceOrderContext } from './BladeTaskOrderContext';
import { colors } from '@mui/material';

function EquipmentSelectionMenu({ setEquipmentActive, className}: { setEquipmentActive: Function, className:string}) {
    return (
        <div className={className}>
            <h2 className="equipment_menu_title">Equipment</h2>
            <button className='equipment_menu_close' onClick={() => setEquipmentActive(false)}><span className="material-symbols-outlined">close</span></button>
            <div className="equipment_menu_items_wrapper">
                <EquipmentListGenerator />
            </div>
        </div>
    );
}

function EquipmentListGenerator() {
    const { loading, error, data } = useQuery(GET_ALL_EQUIPMENT_TYPES);

    if (loading) return (<div className="equipment_menu_item">LOADING</div>);

    if (error) {
        console.log(error.message);
        return (<div className="equipment_menu_item">ERROR</div>);
    }

    //Returns a dropdown of all the test types present in DB
    return data.DictionaryAllByCategory.map(({ id, label }: { id: string, label: string }) =>
        <EquipmentMenuItem resourceName={label} key={Number(id)} />)
}

function CustomMenuItem(){
    const changeResourceOrder = useResourceOrderContext();
    const [userEquipmentName, setUserEquipmentName] = useState('');
    return (
        <div className="custom_menu_item">
            <button
                className="equipment_menu_item_button"
                onClick={() => {
                    if(sanitize(userEquipmentName) !== ''){
                        changeResourceOrder((prevResourceOrder: ResourceOrder[]) => EquipmentMenuItemLogic(prevResourceOrder, sanitize(userEquipmentName)))
                    }else{setUserEquipmentName('')}
                }}
            >
                <span className="equipment_menu_item_icon material-symbols-outlined">add_circle</span>
            </button>
            <input type='text' value={userEquipmentName} className='custom_menu_item_input' onChange={(e) => setUserEquipmentName(e.currentTarget.value)}></input>
        </div>
    );
}

function EquipmentMenuItem({resourceName}: {resourceName: string }) {
    const changeResourceOrder = useResourceOrderContext();
    return (
        <div className="equipment_menu_item">
            <button
                className="equipment_menu_item_button"
                onClick={() => changeResourceOrder((prevResourceOrder: ResourceOrder[]) =>
                    EquipmentMenuItemLogic(prevResourceOrder, resourceName))}
            >
                <span className="equipment_menu_item_icon material-symbols-outlined">add_circle</span>
            </button>
            <h2 className='equipment_menu_item_title'>{resourceName}</h2>
        </div>
    );
}

function EquipmentMenuItemLogic(prevResourceOrder: ResourceOrder[], resourceName: string) {
    return [...prevResourceOrder, { resourceType: "Equipment", resourceName: resourceName, equipmentAssignmentStatus: [true, true], workHours: 0 }];
}

function sanitize(input:string){
    const sanitizedString = input.replace(/[^a-zA-Z0-9_ -]/g, '');
    return sanitizedString;
};

export default EquipmentSelectionMenu;