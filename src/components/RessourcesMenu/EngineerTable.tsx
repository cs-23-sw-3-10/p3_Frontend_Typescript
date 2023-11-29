import React, { useState } from 'react';
import './Ressource.css';
import { useMutation } from '@apollo/client';
import { CREATE_ENGINEER_MUTATION } from '../../api/mutationList';
import { SanitizeString } from './RessourceUtils';
import { ComboBoxSelector } from './RessourcesUtils';
import { GET_ALL_ENGINEERS } from '../../api/queryList';

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
    const [createEngineer, { data, loading, error }] = useMutation(CREATE_ENGINEER_MUTATION);

    function validateForm() : boolean { 
        let tempErros: EngineerErrors = {name:'', maxWorkHours:''};
        let isValid = true;
        if (!formData.name || formData.name.trim().length < 3 || formData.name.trim().length > 50) {
            tempErros.name = "Name is required and must be between 3 and 50 characters";
            isValid = false;
        }
        
        if (!formData.maxWorkHours || formData.maxWorkHours < 0 || formData.maxWorkHours > 100){
            tempErros.maxWorkHours = "Work hours a week must be between 0 and 100";
            isValid = false;
        }
        if (SanitizeString(formData.name) !== formData.name) {
            tempErros.name = "Name must be alphanumeric";
            isValid = false;
        }
        if (SanitizeString(formData.maxWorkHours.toString()) !== formData.maxWorkHours.toString()) {
            tempErros.maxWorkHours = "Work hours a week must be numeric";
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
            <form onSubmit={handleSubmit} className='form-style'>
                <h2 className='h2-style'>Add/update Engineer</h2>
                <div>
                    <label htmlFor="name" className='label-style'>Name</label>
                    <ComboBoxSelector
                        selectedValue={formData.name}
                        setSelectedValue={(value : string) => setFormData({...formData, name: value})}
                        setItemList={() => {}}
                        className='text-input'
                        query={GET_ALL_ENGINEERS}
                        dataKey='AllEngineers'
                        mappingFunction = {({name} : {name : string}) => name}
                    />
                    {errors.name && <span className='error-message'>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="maxWorkHours" className='label-style'>maxWorkHours</label>
                    <input 
                        type="number" 
                        name="maxWorkHours" 
                        id="maxWorkHours" 
                        value={formData.maxWorkHours} 
                        onChange={handleChange} 
                        className='text-input' 
                    />
                    {errors.maxWorkHours && <span className='error-message'>{errors.maxWorkHours}</span>}
                </div>
                <button type="submit" className='submit-button'>Submit</button>
                <div>
                    {loading && <p className='loading-message'>Loading...</p>}
                    {error && <p className='error-message'>{error.message}</p>}
                    {data && <p className='success-message'>Datebase was successfully updated!</p>}
                </div>
            </form>
        </>
    );

};

export default EngineerTable;