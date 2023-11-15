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
                                <div className="period">
                                    <fieldset className='period_selector'>
                                        <div className='checkBox'>
                                            <input type="checkbox" id={"attachPeriod" + resourceOrders.indexOf(order)} name={"attachPeriod" + resourceOrders.indexOf(order)}/>
                                            <label htmlFor={"attachPeriod" + resourceOrders.indexOf(order)}>Attach</label>
                                        </div>
                                        <div className='checkBox'>
                                            <input type="checkbox" id={"testPeriod" + resourceOrders.indexOf(order)} name={"testPeriod" + resourceOrders.indexOf(order)}/>
                                            <label htmlFor={"testPeriod" + resourceOrders.indexOf(order)}>Test</label>
                                        </div>
                                        <div className='checkBox'>
                                            <input type="checkbox" id={"detachPeriod" + resourceOrders.indexOf(order)} name={"detach" + resourceOrders.indexOf(order)} />
                                            <label htmlFor={"detachPeriod" + resourceOrders.indexOf(order)}>Detach</label>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        ))
                        }
        </div>
    );
}

export default EquipmentList;