import React from 'react';
import './EquipmentList.css';
import { ResourceOrder } from './BTMenuTypes';

function EquipmentList({resourceOrders}:{resourceOrders:ResourceOrder[]}){
    return(
        <div className="equipment_list">
                        {resourceOrders.map((order) => (
                            <div className='equipment_entry'>
                                <div className='type'>
                                    <h2 className='title'>{order.ResourceType}</h2>
                                </div>
                                <div className="amount">
                                    <h2 className="title">{order.EquipmentAmount}</h2>
                                </div>
                            </div>
                        ))
                        }
        </div>
    );
}

export default EquipmentList;