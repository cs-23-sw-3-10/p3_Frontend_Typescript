
import React, { useState } from 'react';


interface TechnicianFormData {
    type : string;
    count : number;
    maxWorkHours : number;
}

interface TechnicianErrors {
    type : string;
    count : string;
    maxWorkHours : string;
}


function TechnicianTable(){
    const [formData, setFormData] = useState<TechnicianFormData>({type:'', count:0, maxWorkHours:0});
    const [errors, setErros] = useState<TechnicianErrors>({type:'', count:'', maxWorkHours:''});

    function validateForm() : boolean { 
        let tempErros: TechnicianErrors = {type:'', count:'', maxWorkHours:''};
        let isValid = true;
        if (!formData.type || formData.type.trim().length < 2 || formData.type.trim().length > 50) {
            tempErros.type = "Type is required and must be between 2 and 50 characters";
            isValid = false;
        }
        if (!formData.count || formData.count < 1 || formData.count > 1000){
            tempErros.count = "Count must be between 1 and 1000";
            isValid = false;
        }
        if (!formData.maxWorkHours || formData.maxWorkHours < 0 || formData.maxWorkHours > 100){
            tempErros.maxWorkHours = "Work hours a week must be between 0 and 100";
            isValid = false;
        }
        setErros(tempErros);
        return isValid;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(validateForm()) {
            console.log("OK: " + {...formData});
            //send data to server
        }
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Type">type</label>
                    <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} />
                    {errors.type && <span style={{color: "red"}}>{errors.type}</span>}
                </div>
                <div>
                    <label htmlFor="count">count</label>
                    <input type="number" name="count" id="count" value={formData.count} onChange={handleChange} />
                    {errors.count && <span style={{color: "red"}}>{errors.count}</span>}
                </div>
                <div>
                    <label htmlFor="Type">maxWorkHours</label>
                    <input type="number" name="maxWorkHours" id="maxWorkHours" value={formData.maxWorkHours} onChange={handleChange} />
                    {errors.maxWorkHours && <span style={{color: "red"}}>{errors.maxWorkHours}</span>}
                </div>
            <button type="submit">Submit</button>
            </form> 

        </>
    );
};

export default TechnicianTable;