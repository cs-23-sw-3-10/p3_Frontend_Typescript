import './EquipmentSelector.css'
import { useQuery} from '@apollo/client';
import {GET_ALL_EQUIPMENT_TYPES} from '../../api/queryList';
import React, { SetStateAction, useContext } from 'react';
import { BTOrder } from './BTMenuTypes';
import { useBTOrderContext } from './BladeTaskOrderContext';

function EquipmentSelectionMenu({setEquipmentActive}:{setEquipmentActive:Function}) {
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
    const currentOrderStateValues = useBTOrderContext();
    const currentOrder = currentOrderStateValues.BTOrder;
    const currentOrderSetter = currentOrderStateValues.setBTOrder;
    return(
        <div className="equipment_menu_item" key={key}>
                    <button 
                        className="equipment_menu_item_button"
                        onClick={function(e){
                            console.log(currentOrder.ResourceOrder);
                            currentOrder.ResourceOrder.push({ResourceType: equipmentType, EquipmentAmount: 1, WorkHours: 0, Period:[0,0,0]});
                            currentOrderSetter(currentOrder);
                        }
                        }
                    >
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
    return data.AllEquipment.map(({name, id}:{name:string, id:string}) => 
    <EquipmentMenuItem equipmentType={name} key={Number(id)}/>) 
}

export default EquipmentSelectionMenu;