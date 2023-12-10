import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ENGINEERS, GET_ALL_TECHNICIANS } from '../../api/queryList';
import { ResourceOrder } from './BTMenuTypes';
import { useResourceOrderContext } from './BladeTaskOrderContext';
import { capitalize } from '../../utils/StringEditing';
import { ActiveEmployeesContext, useActiveEmployeesContext } from './EmployeesActiveContext';
import './EmployeesMenu.css';


function EmployeesMenu({resourceOrders}:{resourceOrders:ResourceOrder[]}) {
    const employeeList: {name: string, active: boolean}[] = [];
    const [selectorActive, setSelectorActive] = useState(false);
    const [activeEmployeesList, setActiveEmployees] = useState(employeeList);

    return (
        <div className="employees_wrapper">
            <ActiveEmployeesContext.Provider value={setActiveEmployees}>
            <h2 className='title staff'>Staff</h2>
            <div className='employee_select'>
                <span className="material-symbols-outlined badge">badge</span>
                <h2 className="title employee">Employees</h2>
                <button className='expand' onClick={() => setSelectorActive(true)}>
                    <span className="material-symbols-outlined expand">expand_circle_right</span>
                </button>
                {selectorActive ? <EmployeesSelectorMenu setSelectorActive={setSelectorActive} activeEmployeesList={activeEmployeesList}/> : <></>}
            </div>
            <div className='employee_list'>
                <EmployeeList resourceOrders={resourceOrders} activeEmployeesList={activeEmployeesList}/>
            </div>
            </ActiveEmployeesContext.Provider>
        </div>

    );
}

function EmployeesSelectorMenu({ setSelectorActive, activeEmployeesList}: { setSelectorActive: Function, activeEmployeesList: {name: string, active: boolean}[]}) {
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
                    <EngineerList activeEmployeesList={activeEmployeesList}/>
                </div>
            </div>
            <div className='employee_selector_menu_technicians'>
                <h2 className='title employee_selector_menu_technicians_title'>Technicians</h2>
                <div className='employee_selector_menu_technicians_list'>
                    <div className='employee_selector_menu_technicians_entry'>
                        <TechnicianList activeEmployeesList={activeEmployeesList}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmployeeEntrySelectorMenu({ name, typeName, activeEmployeesList}: {name: string, typeName: string, activeEmployeesList: {name: string, active: boolean}[]}) {
    const changeResourceOrders = useResourceOrderContext();
    const changeActiveEmployees = useActiveEmployeesContext();

    let initials: string = '';
    if (typeName === "Engineer") {
        initials = GetInitials(name);
    }

    const handleResourceCreation = () => {
        changeResourceOrders((prevResourceOrders: ResourceOrder[]) => {
            let newResourceOrders = [...prevResourceOrders, {resourceType:typeName, resourceName:name, equipmentAssignmentStatus:[true,true], workHours:0}];
            return newResourceOrders;
        });
        changeActiveEmployees((currentList:{name:string, active:boolean}[]) => {
            let newList = [...currentList, {name: name, active:true}];
            return newList;
        })
    }

    return (
        <>
        {activeEmployeesList.filter((e) => e.name === name).length > 0 
        ? 
        <></>
        :
        <button className='employee_selector_menu_entry_button' onClick={handleResourceCreation}>
            <div className='employee_selector_menu_entry'>
                <div className='employee_initials_profile'>
                    <h2 className='employee_initials'>{initials.toUpperCase()}</h2>
                </div>
                <h2 className='employee_selector_menu_entry_name'>{capitalize(name)}</h2>
            </div>
        </button>}
        </>
    );
}

function GetInitials(name:string){
    let nameArray: Array<string> = name.split(' ');
    let initials: string = nameArray[0][0] + nameArray[1][0];
    return initials;
    
}

function EmployeeEntry({name, initials, resourceOrders, activeEmployeesList}:{name:string, initials:string, resourceOrders:ResourceOrder[], activeEmployeesList: {name: string, active: boolean}[]}) {
    const changeResourceOrders = useResourceOrderContext();
    const changeActiveEmployees = useActiveEmployeesContext();
    const [employeeHours, setEmployeeHours] = useState(0);

    const handleRemoval = () => {
        const updatedOrders = [...resourceOrders];
        const currentOrder = updatedOrders.filter((order) => order.resourceName === name)[0];
        const currentEntryIndex = updatedOrders.indexOf(currentOrder);
        updatedOrders.splice(currentEntryIndex, 1);
        changeResourceOrders(updatedOrders);

        const updatedEmployees = [...activeEmployeesList];
        const currentEmployee = updatedEmployees.filter((employee) => employee.name === name)[0];
        const currentEmployeeIndex = updatedEmployees.indexOf(currentEmployee);
        updatedEmployees.splice(currentEmployeeIndex, 1);
        changeActiveEmployees(updatedEmployees);
    }

    const handleEmployeeHours = (hours:number) => {
        setEmployeeHours(hours);
        const updatedOrders = [...resourceOrders];
        const currentOrder = updatedOrders.filter((order) => order.resourceName === name)[0];
        const currentOrderIndex = updatedOrders.indexOf(currentOrder);
        updatedOrders[currentOrderIndex].workHours = hours;
        changeResourceOrders(updatedOrders);
    }
    
    return (
        <div className='employee_entry'>
            <button className='employee_entry_remove' onClick={handleRemoval}>
                <span className="material-symbols-outlined">chips</span>
            </button>
            <div className='employee_entry_icon'>
                <h2 className='employee_entry_initials'>{initials.toUpperCase()}</h2>
            </div>
            <div className='employee_entry_name_wrapper'>
                <h2 className='employee_entry_name'>{capitalize(name)}</h2>
            </div>
            <div className='employee_entry_hours'>
                <input
                    className='emoloyee_entry_hours_input'
                    type="number"
                    value={employeeHours}
                    placeholder='Hours'
                    onChange={(e) => handleEmployeeHours(Number(e.currentTarget.value))}
                />
            </div>
        </div>
    );
}

function EngineerList({activeEmployeesList}:{activeEmployeesList: {name: string, active: boolean}[]}) {
    const { loading, error, data } = useQuery(GET_ALL_ENGINEERS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if (loading) return (<div>LOADING</div>);

    //Error returns an empty list
    if (error) {
        return (<div>ERROR</div>);
    }
    return data.AllEngineers.map(({ name, __typename, id }: { name: string, __typename: string, id:string}) =>
        (<EmployeeEntrySelectorMenu name={name} typeName={__typename} activeEmployeesList={activeEmployeesList} key={id}/>)
    );
}

function TechnicianList({activeEmployeesList}:{activeEmployeesList: {name: string, active: boolean}[]}) {
    const { loading, error, data } = useQuery(GET_ALL_TECHNICIANS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if (loading) return (<div>LOADING</div>);

    //Error returns an empty list
    if (error) {
        return (<div>ERROR</div>);
    }

    return data.AllTechnicians.map(({ type, __typename, id}: { type: string, __typename: string, id:string}) =>
        (<EmployeeEntrySelectorMenu name={type} typeName={__typename} activeEmployeesList={activeEmployeesList} key={id}/>)
    );
}

function EmployeeList({resourceOrders, activeEmployeesList}:{resourceOrders:ResourceOrder[], activeEmployeesList: {name: string, active: boolean}[]})
{
    let employeeResourceOrders = resourceOrders.filter((order:ResourceOrder) => ((order.resourceType === "Engineer") || (order.resourceType === "Technician")));
    return <>{employeeResourceOrders.map((order) => 
        <EmployeeEntry 
        name={order.resourceName} 
        initials={(order.resourceType === "Engineer") ? GetInitials(order.resourceName) : ""}
        resourceOrders={resourceOrders}
        activeEmployeesList={activeEmployeesList}
        key={order.resourceName}
        />
    )}</>
}

export default EmployeesMenu;