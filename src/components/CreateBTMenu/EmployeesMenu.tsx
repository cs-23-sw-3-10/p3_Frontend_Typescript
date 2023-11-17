import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ENGINEERS, GET_ALL_TECHNICIANS } from '../../api/queryList';
import { ResourceOrder } from './BTMenuTypes';
import { useResourceOrderContext } from './BladeTaskOrderContext';
import './EmployeesMenu.css';

function EmployeesMenu({resourceOrders}:{resourceOrders:ResourceOrder[]}) {
    const [selectorActive, setSelectorActive] = useState(false);

    useEffect(() => {
        console.log(selectorActive);
    }, [selectorActive])

    return (
        <div className="employees_wrapper">
            <h2 className='title staff'>Staff</h2>
            <div className='employee_select'>
                <span className="material-symbols-outlined badge">badge</span>
                <h2 className="title employee">Employees</h2>
                <button className='expand' onClick={() => setSelectorActive(true)}>
                    <span className="material-symbols-outlined expand">expand_circle_right</span>
                </button>
                {selectorActive ? <EmployeesSelectorMenu setSelectorActive={setSelectorActive} /> : <></>}
            </div>
            <div className='employee_list'>
                <EmployeeList resourceOrders={resourceOrders}/>
            </div>
        </div>

    );
}

function EmployeesSelectorMenu({ setSelectorActive }: { setSelectorActive: Function }) {
    return (
        <div className='employee_selector_menu'>
            <div className='employee_selector_menu_header'>
                <h2 className='employee_selector_menu_title'>Employees</h2>
                <button className='employee_selector_menu_close' onClick={() => setSelectorActive(false)}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className='employee_selector_menu_engineers'>
                <h2 className='title employee_selector_menu_engineers_title'>Engineers</h2>
                <div className='employee_selector_menu_engineers_list'>
                    <EngineerList />
                </div>
            </div>
            <div className='employee_selector_menu_technicians'>
                <h2 className='title employee_selector_menu_technicians_title'>Technicians</h2>
                <div className='employee_selector_menu_technicians_list'>
                    <div className='employee_selector_menu_technicians_entry'>
                        <TechnicianList />
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmployeeEntrySelectorMenu({ name, typeName }: { name: string, typeName: string }) {
    const changeResourceOrders = useResourceOrderContext();
    let nameArray: Array<string> = name.split(' ');
    let initials: string = '';
    if (typeName === "Engineer") {
        initials = nameArray[0][0] + nameArray[1][0];
    }

    const handleResourceCreation = () => {
        changeResourceOrders((prevResourceOrders: ResourceOrder[]) => {
            let newResourceOrders = [...prevResourceOrders, {ResourceType:typeName, ResourceName:name, EquipmentAmount:1, WorkHours:0, Period:[false,false,false]}];
            return newResourceOrders;
        })
    }

    return (
        <button className='employee_selector_menu_entry_button' onClick={handleResourceCreation}>
            <div className='employee_selector_menu_entry'>
                <div className='employee_initials_profile'>
                    <h2 className='employee_initials'>{initials}</h2>
                </div>
                <h2 className='employee_selector_menu_entry_name'>{name}</h2>
            </div>
        </button>
    );
}

function EmployeeEntry({name, initials}:{name:string, initials:string}) {
    return (
        <div className='employee_entry'>
            <button className='employee_entry_remove'>
                <span className="material-symbols-outlined">chips</span>
            </button>
            <div className='employee_entry_icon'>
                <h2 className='employee_entry_initials'>{initials}</h2>
            </div>
            <div className='employee_entry_name_wrapper'>
                <h2 className='employee_entry_name'>{name}</h2>
            </div>
            <div className='employee_entry_hours'>
                <input
                    className='emoloyee_entry_hours_input'
                    type="number"
                    placeholder='Hours'
                />
            </div>
        </div>
    );
}

function EngineerList() {
    const { loading, error, data } = useQuery(GET_ALL_ENGINEERS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if (loading) return (<div>LOADING</div>);

    //Error returns an empty list
    if (error) {
        console.log(error.message);
        return (<div>ERROR</div>);
    }

    console.log(data.AllEngineers);

    return data.AllEngineers.map(({ name, __typename }: { name: string, __typename: string }) =>
        (<EmployeeEntrySelectorMenu name={name} typeName={__typename} />)
    );
}

function TechnicianList() {
    const { loading, error, data } = useQuery(GET_ALL_TECHNICIANS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if (loading) return (<div>LOADING</div>);

    //Error returns an empty list
    if (error) {
        console.log(error.message);
        return (<div>ERROR</div>);
    }

    console.log(data.AllTechnicians);

    return data.AllTechnicians.map(({ type, __typename }: { type: string, __typename: string }) =>
        (<EmployeeEntrySelectorMenu name={type} typeName={__typename} />)
    );
}

function EmployeeList({resourceOrders}:{resourceOrders:ResourceOrder[]})
{
    return <div></div>;
}





export default EmployeesMenu;