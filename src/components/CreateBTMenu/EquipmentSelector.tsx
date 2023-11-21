import './EquipmentSelector.css'
import { useQuery} from '@apollo/client';
import {GET_ALL_EQUIPMENT_TYPES} from '../../api/queryList';
import React, { SetStateAction, useContext } from 'react';
import { ResourceOrder } from './BTMenuTypes';
import { useResourceOrderContext } from './BladeTaskOrderContext';

function EquipmentSelectionMenu({setEquipmentActive}:{setEquipmentActive:Function}) {
    return(
        <div className='equipment_menu'>
            <h2 className="equipment_menu_title">Equipment</h2>
            <button className='equipment_menu_close' onClick={() => setEquipmentActive(false)}><span className="material-symbols-outlined">close</span></button>
            <div className="equipment_menu_items_wrapper">
                <EquipmentListGenerator/>
            </div>
        </div>
    );
}

function EquipmentListGenerator(){
    const { loading, error, data} = useQuery(GET_ALL_EQUIPMENT_TYPES);
    
    if(loading) return(<div className="equipment_menu_item">LOADING</div>);

    if(error){
        console.log(error.message);
        return (<div className="equipment_menu_item">ERROR</div>);
    }

    //Returns a dropdown of all the test types present in DB
    return data.DictionaryAllByCategory.map(({id, label}:{id:string, label:string}) => 
    <EquipmentMenuItem equipmentType={label} key={Number(id)}/>) 
}

function EquipmentMenuItem({equipmentType}:{equipmentType:string}){
    const changeResourceOrder = useResourceOrderContext();
    return(
        <div className="equipment_menu_item">
                    <button 
                        className="equipment_menu_item_button"
                        onClick={() => changeResourceOrder((prevResourceOrder:ResourceOrder[]) => 
                            EquipmentMenuItemLogic(prevResourceOrder, equipmentType))}
                    >
                            <span className="equipment_menu_item_icon material-symbols-outlined">add_circle</span>
                    </button>
                    <h2 className='equipment_menu_item_title'>{equipmentType}</h2>
        </div>
    );
}

function EquipmentMenuItemLogic(prevResourceOrder:ResourceOrder[], equipmentType:string){
    return [...prevResourceOrder, {resourceType:equipmentType, resourceName:"", equipmentAssignmentStatus:[false,false,false], workHours:0}];
}

export default EquipmentSelectionMenu;