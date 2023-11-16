import React,{useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ENGINEERS } from '../../api/queryList';
import './EmployeesMenu.css';

function EmployeesMenu(){
    const [selectorActive, setSelectorActive] = useState(false);

    useEffect(() => {
        console.log(selectorActive);
    },[selectorActive])

    return(
        <div className="employees_wrapper">
                    <h2 className='title staff'>Staff</h2>
                    <div className='employee_select'>
                        <span className="material-symbols-outlined badge">badge</span>
                        <h2 className="title employee">Employees</h2>
                        <button className='expand' onClick={() => setSelectorActive(true)}>
                            <span className="material-symbols-outlined expand">expand_circle_right</span>
                        </button>
                        {selectorActive ? <EmployeesSelectorMenu setSelectorActive={setSelectorActive}/> : <></>}
                    </div>
                    <div className='employee_list'>
                        <div className='employee_entry'></div>
                    </div>

        </div>

    );
}

function EmployeesSelectorMenu({setSelectorActive}:{setSelectorActive:Function}){
    return(
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
                    <EngineerList/>
                </div>
            </div>
            <div className='employee_selector_menu_technicians'>
                <h2 className='title employee_selector_menu_technicians_title'>Technicians</h2>
                <div className='employee_selector_menu_technicians_list'>
                    <div className='employee_selector_menu_technicians_entry'>

                    </div>
                </div>
            </div>
        </div>
    );
}

function EmployeeEntry({name}:{name:string}){
    let nameArray:Array<string> = name.split(' ');
    let initials:string = nameArray[0][0] + nameArray[1][0];
    return(
        <button className='employee_selector_menu_entry_button'>
        <div className='employee_selector_menu_entry'>
            <div className='employee_initials_profile'>
                <h2 className='employee_initials'>{initials}</h2>
            </div>
            <h2 className='employee_selector_menu_entry_name'>{name}</h2>
        </div>
        </button>
    );
}

function EngineerList(){
    const { loading, error, data} = useQuery(GET_ALL_ENGINEERS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if(loading) return(<div>LOADING</div>);

    //Error returns an empty list
    if(error){
        console.log(error.message);
        return (<div>ERROR</div>);
    }

    console.log(data.AllEngineers);

    return data.AllEngineers.map(({name}:{name:string}) => 
        (<EmployeeEntry name={name}/>)
    );
}

export default EmployeesMenu;