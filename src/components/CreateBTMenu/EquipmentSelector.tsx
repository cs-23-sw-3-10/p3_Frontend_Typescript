import './EquipmentSelector.css'
import { useQuery} from '@apollo/client';
import {GET_ALL_EQUIPMENT_TYPES} from '../../api/queryList';
import React, { SetStateAction } from 'react';

function EquipmentSelectionMenu({setEquipmentActive}:{setEquipmentActive:React.Dispatch<SetStateAction<boolean>>}) {
    return(
        <div className='equipment_menu'>
            <h2 className="equipment_menu_title">DB</h2>
            <button className='equipment_menu_close' onClick={() => setEquipmentActive(false)}><span className="material-symbols-outlined">close</span></button>
            <input className="equipment_menu_search" type="text" />
            <div className="equipment_menu_items_wrapper">
                <EquipmentListGenerator/>
            </div>
        </div>
    );

}

function EquipmentMenuItem({equipmentType, key}:{equipmentType:string, key:number}){
    return(
        <div className="equipment_menu_item" key={key}>
                    <button className="equipment_menu_item_button">
                        <span className="equipment_menu_item_icon material-symbols-outlined">add_circle</span>
                    </button>
                    <h2 className='equipment_menu_item_title'>{equipmentType}</h2>
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
    console.log(data?.AllEquipment);
    return data.AllEquipment.map(({name, id}:{name:string, id:string}) => <EquipmentMenuItem equipmentType={name} key={Number(id)}/>) 
}



export default EquipmentSelectionMenu;