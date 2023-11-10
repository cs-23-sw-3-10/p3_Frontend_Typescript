import './BladeTaskMenu.css';
import TestTypeOptions from './TestTypeSelector';
import TestRigOptions from './TestRigSelector';
import React, {useState, useRef} from 'react';

function handleDateChange(e:React.FormEvent<HTMLInputElement>, setDate:Function){ 
    setDate(e.currentTarget.value);
}

function handleDateValidation(e:React.FormEvent<HTMLInputElement>, setDate:Function, setErrorStyle:Function){
    let inputFromForm:string = e.currentTarget.value;
    let currentDate:Date = new Date()
    let inputDate:Date = new Date(inputFromForm);

    //Granularity of days -> Set hour to the same value for both dates
    currentDate.setHours(1,0,0,0);
    inputDate.setHours(1,0,0,0);

    //Setting the date in input element requires date to be in string format
    let currentDateString:string = currentDate.toISOString().split('T')[0];

    //
    if(inputDate >= currentDate){
        setErrorStyle(false);
        setDate(e.currentTarget.value);
    }else{
        setErrorStyle(true);
        setDate(currentDateString);
    }
}

function InvalidInputElement(message:string){
    return(
        <div className='invalidInput'>
            <p>{message}</p>
        </div>
    );
}

function BladeTaskMenu(){
        const currentDate = new Date().toISOString().split('T')[0];
        const [invalidInput, setErrorStyle] = useState(false);
        const [date, setDate] = useState(currentDate);

        return (
            <div className='btmenu-container'>
               
                <input 
                    className='item id_select' 
                    type="text" 
                    placeholder='Select Task Name'
                />
                
                <div className="item testtype_wrapper">
                    <h2 className="title">Type</h2>
                    <select className="testtype_select" id="testtype" name="testtype">
                        <TestTypeOptions/>
                    </select>
                </div>
    
                <div className='item date_selection_wrapper'>
                    <h2 className='title'>Start Date</h2>
                    
                    <input 
                        type="date" 
                        className={invalidInput ? "error": "startdate_select"}
                        value={date}
                        onChange={(e) => handleDateChange(e,setDate)}
                        onBlur={(e) => handleDateValidation(e,setDate, setErrorStyle)}
                    />
                
                    <h2 className="title">Duration</h2>
                    
                    <input type="number" className="item duration_select" />
                
                    <h2 className="title">Test Rig</h2>
                    
                    <select id="testrig" name="testrig">
                        <TestRigOptions/>
                    </select>

                </div>
    
                <div className='item equipment_wrapper'>
                    <h2 className='title equipment'>Equipment</h2>
    
                    <div className='title equipment_type'>
                        <h2 className='title'>Equipment Type</h2>
                    </div>
    
                    <div className='title equipment_amount'>
                        <h2 className='title'>Equipment Amount</h2>
                    </div>
    
                    <div className="equipment_list">
                        <div className='equipment_entry'>
                            <div className='type'>
                                <h2 className='title'>A</h2>
                            </div>
                            <div className="amount">
                                <h2 className="title">2</h2>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="item employees_wrapper">
                    <h2 className='title staff'>Staff</h2>
                    <div className='employee_select'>
                        <span className="material-symbols-outlined badge">badge</span>
                        <h2 className="title employee">Employees</h2>
                        <p className='expand'><span className="material-symbols-outlined expand">expand_circle_right</span></p>
                    </div>
                    <div className='employee_list'>
                        <div className='employee_entry'>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
}
 
export default BladeTaskMenu;