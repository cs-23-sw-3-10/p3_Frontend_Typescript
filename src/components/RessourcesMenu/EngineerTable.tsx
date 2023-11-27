import React, { useState } from 'react';
import styles from './Ressource.module.css';
import { create } from 'domain';
import { useMutation } from '@apollo/client';
import { CREATE_ENGINEER_MUTATION } from '../../api/mutationList';

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
    const [createEngineer, { loading, error }] = useMutation(CREATE_ENGINEER_MUTATION);

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
            createEngineer({variables: { 
                name: String (formData.name),
                maxWorkHours: Number (formData.maxWorkHours)
            }}).then(response => {
                console.log('Engineer created: ' + response);
            }).catch(error => {
                console.log('Error creating Engineer: ' + error);
            })
        }
    }

    return (
        <>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Add Engineer to the system</h2>
                <div>
                    <label htmlFor="Name" className={styles.label}>Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={styles.input}/>
                    {errors.name && <span style={{color: "red"}}>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="Type" className={styles.label}>maxWorkHours</label>
                    <input type="number" name="maxWorkHours" id="maxWorkHours" value={formData.maxWorkHours} onChange={handleChange} className={styles.input} />
                    {errors.maxWorkHours && <span style={{color: "red"}}>{errors.maxWorkHours}</span>}
                </div>
            <button type="submit">Submit</button>
            </form> 

        </>
    );
};

export default EngineerTable;