import React, { useState } from 'react';
import './Ressource.css';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_ENGINEER_MUTATION, DELETE_ENGINEER } from '../../api/mutationList';
import { SanitizeString } from './RessourcesUtils';
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
interface FormFeedback {
    message : string;
    type : 'error' | 'success' | 'loading' | '';
}


function EngineerTable(){
    const [formData, setFormData] = useState<EngineerFormData>({name:'', maxWorkHours:0});
    const [errors, setErros] = useState<EngineerErrors>({name:'', maxWorkHours:''});
    const [createEngineer, { data, loading, error}] = useMutation(CREATE_ENGINEER_MUTATION);
    const [deleteEngineer, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_ENGINEER);
    const [formFeedback, setFormFeedback] = useState<FormFeedback>({message:'', type:''});
    const { refetch } = useQuery(GET_ALL_ENGINEERS);

    const [submitAction, setSubmitAction] = useState<string>('');

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
            setFormFeedback({message:'', type:'loading'});
            if (submitAction === 'submit') {
                createEngineer({variables: { 
                    name: String (formData.name),
                    maxWorkHours: Number (formData.maxWorkHours)
            }}).then(response => {
                console.log('Engineer created: ' + response);
                setFormFeedback({ message: response.data.CreateEngineer.name + ' was added to the database', type: 'success' });
                refetch(); //update combobox
            }).catch(error => {
                console.log('Error creating Engineer: ' + error);
                setFormFeedback({ message: 'Error creating Engineer: ' + error.message, type: 'error' });
            })
            } else if (submitAction === 'delete') {
                deleteEngineer(
                    {variables: {
                        name: String (formData.name)
                }}).then(response => {
                    console.log('Engineer deleted: ' + response);
                    setFormFeedback({ message: response.data.DeleteEngineer.name + ' was deleted from the database', type: 'success' })
                    refetch(); //update combobox
                }
                ).catch(error => {
                    console.log('Error deleting Engineer: ' + error);
                    setFormFeedback({ message: 'Error deleting Engineer: ' + error.message, type: 'error' });
                });
            }

        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className='form-style'>
                <h2 className='h2-style'>Engineer</h2>
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
                <button type="submit" onClick={() => setSubmitAction('submit')} className='submit-button' value="submit">Submit</button>
                <button type="submit" onClick={() => setSubmitAction('delete')} className='delete-button' value="delete">Delete</button>
                <div>
                    {formFeedback.type === "loading" && <p className='loading-message'>Loading...</p>}
                    {formFeedback.type === "error" && <p className='error-message'>{formFeedback.message}</p>}
                    {formFeedback.type === "success" && <p className='success-message'>{formFeedback.message}</p>}
                </div>
            </form>
        </>
    );

};

export default EngineerTable;