import './BladeTaskMenu.css';
import TaskNameSelector from './TaskNameSelector';
import TestTypeOptions from './TestTypeSelector';
import TestRigOptions from './TestRigSelector';
import EquipmentSelectionMenu from './EquipmentSelector';
import React, {useState, useRef} from 'react';

type inErrorChart = {
    BTName: boolean;
    Type: boolean;
    StartDate: boolean;
    Duration: boolean;
    TestRig: boolean;
    Equipment: boolean;
    Employees: boolean;
}

function handleDateChange(e:React.FormEvent<HTMLInputElement>, setDate:Function){ 
    setDate(e.currentTarget.value);
}

function handleDurationChange(e:React.FormEvent<HTMLInputElement>, setDuration:Function){
    setDuration(e.currentTarget.value);
}

function handleDurationValidation(e:React.FormEvent<HTMLInputElement>, setDuration:Function, setErrorStyle:Function, inErrorChart:inErrorChart){

}

function handleDateValidation(e:React.FormEvent<HTMLInputElement>, setDate:Function, setErrorStyle:Function, inErrorChart:inErrorChart){
    let inputFromForm:string = e.currentTarget.value;
    let currentDate:Date = new Date()
    let inputDate:Date = new Date(inputFromForm);

    //Granularity of days -> Set hour to the same value for both dates
    currentDate.setHours(1,0,0,0);
    inputDate.setHours(1,0,0,0);
    console.log(currentDate);
    console.log(inputDate);

    //Setting the date in input element requires date to be in string format
    let currentDateString:string = currentDate.toISOString().split('T')[0];

    //
    if(inputDate >= currentDate){
        inErrorChart.StartDate = false;
        console.log(inErrorChart);
        setErrorStyle(inErrorChart);
        setDate(inputFromForm);
    }else{
        inErrorChart.StartDate = true;
        setErrorStyle(inErrorChart);
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
        const [inErrorChart, setErrorStyle] = useState({
            BTName: false,
            Type: false,
            StartDate: false,
            Duration: false,
            TestRig: false,
            Equipment: false,
            Employees: false,
        });
        const [date, setDate] = useState(currentDate);
        const [duration, setDuration] = useState(0);
        const [equipmentActive, setEquipmentActive] = useState(false);

        return (
            <div className='btmenu-container'>

                <TaskNameSelector/>
                <div className="item testtype_wrapper">
                    <h2 className="title">Type</h2>
                    <select className="testtype_select" id="testtype" name="testtype">
                        <TestTypeOptions/>
                    </select>
                </div>
    
                <div className='item date_selection_wrapper'>
                    <h2 className='title'>Start Date</h2>
                    {/*Element appears when user provides invalid input for date*/}
                    {/*invalidInput ? <InvalidInputElement message="Start date cannot be before todays date"/> : <></> */}
                    <input 
                        type="date" 
                        className={inErrorChart.StartDate ? "error": "startdate_select"}
                        value={date}
                        onChange={(e) => handleDateChange(e,setDate)}
                        onBlur={(e) => handleDateValidation(e,setDate, setErrorStyle, inErrorChart)}
                    />
                
                    <h2 className="title">{"Duration(Days)"}</h2>
                    <input 
                        type="number"
                        className="item duration_select" 
                        name="duration_select" 
                        placeholder='Days'
                        min={0}
                        onChange={(e) => handleDurationChange(e,setDuration)}
                    />
                
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

                        <div className='equipment_entry'>
                            <div className='type'>
                                <h2 className='title'>A</h2>
                            </div>
                            <div className="amount">
                                <h2 className="title">2</h2>
                            </div>
                        </div>

                        <div className='equipment_entry'>
                            <div className='type'>
                                <h2 className='title'>A</h2>
                            </div>
                            <div className="amount">
                                <h2 className="title">2</h2>
                            </div>
                        </div>

                        <div className='equipment_entry'>
                            <div className='type'>
                                <h2 className='title'>A</h2>
                            </div>
                            <div className="amount">
                                <h2 className="title">2</h2>
                            </div>
                        </div>

                        <div className='equipment_entry'>
                            <div className='type'>
                                <h2 className='title'>A</h2>
                            </div>
                            <div className="amount">
                                <h2 className="title">2</h2>
                            </div>
                        </div>


                    </div>

                    <div className="equipment_interaction">
                        <button className='equipment_add' onClick={(e) => setEquipmentActive(true)}> 
                            <span className="material-symbols-outlined">add_circle</span>
                        </button>
                    </div>

                    {equipmentActive ? <EquipmentSelectionMenu/> : <></>}

                </div>
    
                <div className="item employees_wrapper">
                    <h2 className='title staff'>Staff</h2>
                    <div className='employee_select'>
                        <span className="material-symbols-outlined badge">badge</span>
                        <h2 className="title employee">Employees</h2>
                        <p className='expand'><span className="material-symbols-outlined expand">expand_circle_right</span></p>
                    </div>
                    <div className='employee_list'>
                        <div className='employee_entry'></div>
                    </div>
                </div>
            </div>
        );
}
 
export default BladeTaskMenu;