import { useMutation } from '@apollo/client';
import React, {useState} from 'react';
import { CREATE_EQUIPMENT_MUTATION } from '../../api/mutationList';
import { SanitizeString } from './RessourceUtils';
import './Ressource.css';

interface EquipmentFormData {
    type : string;
    calibrationExpirationDate: string;
    name : string;
}
interface EquipmentErrors {
    type : string;
    calibrationExpirationDate : string;
    name : string;
}


function EquipmentTable(){
    const [formData, setFormData] = useState<EquipmentFormData>({
        type : "", calibrationExpirationDate: "", name : ""});
    const [errors, setErros] = useState<EquipmentErrors>({type:'', calibrationExpirationDate:'', name:''});
    const [createEquipment, { data, loading, error }] = useMutation(CREATE_EQUIPMENT_MUTATION);


    function validateForm() : boolean{ 
        let tempErros: EquipmentErrors = {type:'', calibrationExpirationDate:'', name:''};
        let isValid = true;

        if (( formData.type.trim().length < 4 || (formData.type.trim().length > 50) || (formData.type.trim().length === 0))){
            tempErros.type = "Type must be between 4 and 50 characters";
            isValid = false;
        }
        if (!formData.name) {
            tempErros.name = "Name is required";
            isValid = false;
        }
        if (!formData.calibrationExpirationDate || Date.parse(formData.calibrationExpirationDate.toString()) < Date.now()) {
            tempErros.calibrationExpirationDate = "Calibration Expiration Date is invalid";
            isValid = false;
        }
        if (SanitizeString(formData.type) !== formData.type) {
            tempErros.type = "Type must be alphanumeric";
            isValid = false;
        }
        if (SanitizeString(formData.name) !== formData.name) {
            tempErros.name = "Name must be alphanumeric";
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
            createEquipment({variables: {
                type: String (formData.type.toLowerCase().trim),
                calibrationExpirationDate: String (formData.calibrationExpirationDate),
                name: String (formData.name)
            }}).then(response => {
                console.log('Equipment created: ' + response);
            }).catch(error => {
                console.log('Error creating Equipment: ' + error);
            });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='form-style'>
                <h2 className='h1-style'>Add Equipment</h2>
                <div>
                    <label htmlFor="type" className='label-style'>Type</label>
                    <input 
                        type="text" 
                        name="type" 
                        id="type" 
                        value={formData.type} 
                        onChange={handleChange} 
                        className='text-input' 
                    />
                    {errors.type && <span className='error-message'>{errors.type}</span>}
                </div>
                <div>
                    <label htmlFor="name" className='label-style'>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className='text-input' 
                    />
                    {errors.name && <span className='error-message'>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="calibrationExpirationDate" className='label-style'>Calibration Expiration Date</label>
                    <input 
                        type="date" 
                        name="calibrationExpirationDate" 
                        id="calibrationExpirationDate" 
                        value={formData.calibrationExpirationDate} 
                        onChange={handleChange} 
                        className='text-input' 
                    />
                    {errors.calibrationExpirationDate && <span className='error-message'>{errors.calibrationExpirationDate}</span>}
                </div>
                <button type="submit" className='submit-button'>Submit</button>
                <div>
                    {loading && <p className='loading-message'>Loading...</p>}
                    {error && <p className='error-message'>Error: {error.message}</p>}
                    {data && <p className='success-message'>{formData.name} with type {formData.type} created successfully!</p>}
                </div>
            </form> 
        </>
    );

};

export default EquipmentTable;