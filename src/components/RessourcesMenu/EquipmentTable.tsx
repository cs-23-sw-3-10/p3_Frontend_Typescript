import { useMutation, useQuery } from '@apollo/client';
import React, {useState} from 'react';
import { CREATE_EQUIPMENT_MUTATION, DELETE_EQUIPMENT} from '../../api/mutationList';
import { SanitizeString } from './RessourcesUtils';
import './Ressource.css';
import { ComboBoxSelector } from './RessourcesUtils';
import { ALL_EQUIPMENT, GET_EQUIPMENT_BY_TYPE, GET_EQUIPMENT_TYPES } from '../../api/queryList';


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
interface FormFeedback {
    message : string;
    type : 'error' | 'success' | 'loading' | '';
}


function EquipmentTable() {
    const [createEquipment, { data, loading, error }] = useMutation(CREATE_EQUIPMENT_MUTATION);
    const [deleteEquipment, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_EQUIPMENT);
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
    //can be either submit or delete. 
    const [submitAction, setSubmitAction] = useState<string>('');
    const [formFeedback, setFormFeedback] = useState<FormFeedback>({message:'', type:''});

    //Refetch queries to update combobox after submit
    const { refetch } = useQuery(GET_EQUIPMENT_TYPES);
    const { refetch: refetchName } = useQuery(GET_EQUIPMENT_BY_TYPE, {variables: {type: formData.type}});
    

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
            setFormFeedback({ message: '', type: 'loading' });
            if (submitAction === 'submit' ) {
                createEquipment({
                    variables: {
                        type: formData.type.toLowerCase().trim(),
                        calibrationExpirationDate: String(formData.calibrationExpirationDate),
                        name: formData.name.toLowerCase().trim()
                    }
                }).then(response => {
                    console.log('Equipment created: ' + response);
                    setFormFeedback({ message: response.data.CreateEquipment.name + ' was added to the database', type: 'success' });
                    refetch(); //update combobox
                    refetchName();
                }).catch(error => {
                    console.log('Error creating Equipment: ' + error);
                    setFormFeedback({ message: 'Error creating Equipment: ' + error.message, type: 'error' });
                });
            }
            else if (submitAction === 'delete') {
                console.log(String (formData.name));
                deleteEquipment({
                    variables: {
                        name: formData.name
                    }
                }).then(response => {
                    console.log('Equipment deleted: ' + response);
                    setFormFeedback({ message: response.data.DeleteEquipment.name + ' was deleted from the database', type: 'success' });
                    refetch(); //update combobox
                    refetchName();
                }).catch(error => {
                    console.log('Error deleting Equipment: ' + error);
                    setFormFeedback({ message: 'Error deleting Equipment: ' + error.message, type: 'error' });
                });

            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='form-style'>
                <h2 className='h2-style'>Equipment</h2>
                <div>
                    <label htmlFor="type" className='label-style'>Type</label>
                    <ComboBoxSelector
                        selectedValue = {formData.type}
                        setSelectedValue = {(value: string) => setFormData({ ...formData, type: value })}
                        setItemList={setTestTypesList}
                        className=''
                        query={GET_EQUIPMENT_TYPES}
                        dataKey='GetEquipmentTypes'
                        mappingFunction={(type) => type}
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
}

export default EquipmentTable;
/**
 *                     <TestTypeSelector
                        testType={formData.type}
                        setTestType={(value: string) => setFormData({ ...formData, type: value })}
                        className='text-input'
                    />
 */