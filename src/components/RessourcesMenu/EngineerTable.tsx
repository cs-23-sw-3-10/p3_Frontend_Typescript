import React, { useState } from 'react';


interface EngineerFormData {
    name : string;
    maxWorkHours : number;
}
interface EngineerErrors {
    name : string;
    maxWorkHours : string;
}


function EngineerTable(){
    const [formData, setFormData] = useState<EngineerFormData>({name:'', maxWorkHours:0});
    const [errors, setErros] = useState<EngineerErrors>({name:'', maxWorkHours:''});

    function validateForm() : boolean { 
        let tempErros: EngineerErrors = {name:'', maxWorkHours:''};
        let isValid = true;
        if (!formData.name || formData.name.trim().length < 2 || formData.name.trim().length > 50) {
            tempErros.name = "Name is required and must be between 2 and 50 characters";
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
                    <label htmlFor="Name">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span style={{color: "red"}}>{errors.name}</span>}
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

export default EngineerTable;