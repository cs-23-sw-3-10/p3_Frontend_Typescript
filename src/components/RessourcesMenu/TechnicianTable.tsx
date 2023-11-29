
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CREATE_TECHNICIAN_MUTATION } from '../../api/mutationList';
import { SanitizeString } from './RessourceUtils';
import './Ressource.css';
import { GET_ALL_TECHNICIANS, GET_ALL_TECHNICIAN_TYPES } from '../../api/queryList';
import { ComboBoxSelector } from './RessourcesUtils';

/** TODO
 * 1. Types are queried from the dictionary, and not the technician table.
 * 2. The technician need to be addtion instead of only creation.
 */
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


function TechnicianTable() {
    const [formData, setFormData] = useState<TechnicianFormData>({
        type:'', 
        count:0, 
        maxWorkHours:0});
    const [errors, setErros] = useState<TechnicianErrors>({
        type:'', 
        count:'', 
        maxWorkHours:''});
    const [createTechnician, { data, loading, error }] = useMutation(CREATE_TECHNICIAN_MUTATION); 
    const [technicianTypesList, setTechnicianTypesList] = useState<string[]>([]);

    function validateForm() : boolean { 
        let tempErros: TechnicianErrors = {type:'', count:'', maxWorkHours:''};
        let isValid = true;
        if (!formData.type || formData.type.trim().length < 3 || formData.type.trim().length > 50) {
            tempErros.type = "Type is required and must be between 2 and 50 characters";
            isValid = false;
        }
        if (technicianTypesList.indexOf(formData.type) === -1) { 
            addTypeToDataBase(formData.type);
        }
        if (!formData.count || formData.count < 1 || formData.count > 1000){
            tempErros.count = "Count must be between 1 and 1000";
            isValid = false;
        }
        if (!formData.maxWorkHours || formData.maxWorkHours < 0 || formData.maxWorkHours > 100){
            tempErros.maxWorkHours = "Work hours a week must be between 0 and 100";
            isValid = false;
        }
         //Use SanitizeString function
        if (SanitizeString(formData.type) !== formData.type) {
            tempErros.type = "Type must be alphanumeric";
            isValid = false;
        }
        if (SanitizeString(formData.count.toString()) !== formData.count.toString()) {
            tempErros.count = "Count must be numeric";
            isValid = false;
        }
        if (SanitizeString(formData.maxWorkHours.toString()) !== formData.maxWorkHours.toString()) {
            tempErros.maxWorkHours = "Work hours a week must be numeric";
            isValid = false;
        }

        setErros(tempErros);
        return isValid;

    }
    function addTypeToDataBase(type : string) {
        
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(validateForm()) {
            console.log("submit " + formData);
            createTechnician({variables: {
                type: String (formData.type.toLowerCase().trim()),
                count: Number (formData.count),
                maxWorkHours: Number (formData.maxWorkHours)
            }}).then(response => {
                console.log('Technician created: ' + response);
            }).catch(error => {
                console.log('Error creating Technician: ' + error);
            });
        }
    }

    return (
        <> 
            <form onSubmit={handleSubmit} className='form-style'>
                <h2 className='h2-style'>Add/update Technician</h2>
                <div>
                    <label htmlFor="type" className='label-style'>Type</label>
                    <ComboBoxSelector
                        selectedValue={formData.type}
                        setSelectedValue={(value : string) => setFormData({...formData, type: value})}
                        setItemList={setTechnicianTypesList}
                        className='text-input'
                        query={GET_ALL_TECHNICIANS}
                        dataKey='AllTechnicians'
                        mappingFunction = {({type} : {type : string}) => type}
                    />
                    {errors.type && <span className='error-message'>{errors.type}</span>}
                </div>
                <div>
                    <label htmlFor="count" className='label-style'>Count</label>
                    <input 
                        type="number" 
                        name="count" 
                        id="count"  
                        value={formData.count} 
                        onChange={handleChange}
                        className='text-input'
                    />
                    {errors.count && <span className='error-message'>{errors.count}</span>}
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
                    {error && <p className='error-message'>Error: {error.message}</p>}
                    {data && <p className='success-message'>Database was successfully updated!</p>}
                </div>
            </form> 
        </>
    );
}

export default TechnicianTable;