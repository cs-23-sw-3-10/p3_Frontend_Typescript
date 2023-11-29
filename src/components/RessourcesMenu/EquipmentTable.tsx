import { useMutation, useQuery } from '@apollo/client';
import React, {useState} from 'react';
import { CREATE_EQUIPMENT_MUTATION } from '../../api/mutationList';
import { SanitizeString } from './RessourceUtils';
import './Ressource.css';
import { ComboBoxSelector } from './RessourcesUtils';
import { GET_ALL_EQUIPMENT_TYPES, GET_EQUIPMENT_BY_TYPE } from '../../api/queryList';

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


function EquipmentTable() {
    const [createEquipment, { data, loading, error }] = useMutation(CREATE_EQUIPMENT_MUTATION);
    const [formData, setFormData] = useState<EquipmentFormData>({
        type: "",
        calibrationExpirationDate: "",
        name: ""
    });
    const [errors, setErrors] = useState<EquipmentErrors>({
        type: '',
        calibrationExpirationDate: '',
        name: ''
    });
    const [testTypesList, setTestTypesList] = useState<string[]>([]);
    

    function validateForm(): boolean {
        let tempErrors: EquipmentErrors = { type: '', calibrationExpirationDate: '', name: '' };
        let isValid = true;

        if ((formData.type.trim().length < 3 || (formData.type.trim().length > 50) || (formData.type.trim().length === 0))) {
            tempErrors.type = "Type must be between 3 and 50 characters";
            isValid = false;
        }
        if (!formData.name || formData.name.trim().length === 0) {
            tempErrors.name = "Name is required";
            isValid = false;
        }
        if (!formData.calibrationExpirationDate || Date.parse(formData.calibrationExpirationDate.toString()) < Date.now()) {
            tempErrors.calibrationExpirationDate = "Calibration Expiration Date is invalid";
            isValid = false;
        }
        if (SanitizeString(formData.type) !== formData.type) {
            console.log(SanitizeString(formData.type) + " " + formData.type);
            tempErrors.type = "Type must be alphanumeric";
            isValid = false;
        }
        if (SanitizeString(formData.name) !== formData.name) {
            tempErrors.name = "Name must be alphanumeric";
            isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (validateForm()) {
            createEquipment({
                variables: {
                    type: String(formData.type.toLowerCase().trim),
                    calibrationExpirationDate: String(formData.calibrationExpirationDate),
                    name: String(formData.name)
                }
            }).then(response => {
                console.log('Equipment created: ' + response);
            }).catch(error => {
                console.log('Error creating Equipment: ' + error);
            });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='form-style'>
                <h2 className='h2-style'>Add/update Equipment</h2>
                <div>
                    <label htmlFor="type" className='label-style'>Type</label>
                    <ComboBoxSelector
                        selectedValue = {formData.type}
                        setSelectedValue = {(value: string) => setFormData({ ...formData, type: value })}
                        setItemList={setTestTypesList}
                        className=''
                        query={GET_ALL_EQUIPMENT_TYPES}
                        dataKey='DictionaryAllByCategory'
                        mappingFunction={({ label }: { label: string }) => label}
                    />

                    {errors.type && <span className='error-message'>{errors.type}</span>}
                </div>
                <div>
                    <label htmlFor="name" className='label-style'>Name</label>
                    
                    <ComboBoxSelector
                        selectedValue={formData.name}
                        setSelectedValue={(value: string) => setFormData({ ...formData, name: value })}
                        setItemList={() => {}}
                        className=''
                        query={GET_EQUIPMENT_BY_TYPE}
                        queryVariables = {{ type: formData.type }}
                        dataKey='EquipmentByType'
                        mappingFunction = {({name} : {name : string}) => name}
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
                    {data && <p className='success-message'>Database was successfully updated!!</p>}
                </div>
            </form>
        </>
    );
}

export default EquipmentTable;
/**
 *                     <TestTypeSelector
                        testType={formData.type}
                        setTestType={(value: string) => setFormData({ ...formData, type: value })}
                        className='text-input'
                    />
 */