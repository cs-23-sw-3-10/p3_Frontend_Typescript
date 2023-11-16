import React, {useState} from 'react';

interface EquipmentFormData {
    type : string;
    calibrationExpirationDate: string;
    name : string;
}

function EquipmentTable(){
    const [formData, setFormData] = useState<EquipmentFormData>({
        type : "", calibrationExpirationDate: "", name : ""});
    const [errors, setErros] = useState({type:'', calibrationExpirationDate:'', name:''});

    function validateForm() : boolean{ 
        let tempErros = {type:'', calibrationExpirationDate:'', name:''};
        let isValid = true;

        if (( formData.type.trim().length < 4 || (formData.type.trim().length > 50) || (formData.type.trim().length === 0))){
            tempErros.type = "Type must be between 4 and 50 characters";
            isValid = false;
        }
        if (!formData.name) {
            tempErros.name = "Type is required";
            isValid = false;
        }
        if (!formData.calibrationExpirationDate || Date.parse(formData.calibrationExpirationDate.toString()) < Date.now()) {
            tempErros.calibrationExpirationDate = "Calibration Expiration Date is invalid";
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
            console.log("OK: " + formData);
            //send data to server
        }
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Type">Type</label>
                    <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} />
                    {errors.type && <span style={{color: "red"}}>{errors.type}</span>}
                </div>
                <div>
                    <label htmlFor="CalibrationExpirationDate">Calibration Expiration Date</label>
                    <input type="date" name="calibrationExpirationDate" id="calibrationExpirationDate" value={formData.calibrationExpirationDate} onChange={handleChange} />
                    {errors.calibrationExpirationDate && <span style={{color: "red"}}>{errors.calibrationExpirationDate}</span>}
                </div>
                <div>
                    <label htmlFor="Name">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span style={{color: "red"}}>{errors.name}</span>}
                </div>
            <button type="submit">Submit</button>
            </form> 

        </>
    );
};

export default EquipmentTable;