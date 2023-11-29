import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Combobox } from "react-widgets/cjs";
import './Ressource.css';
import '../../../node_modules/react-widgets/styles.css';


/**
 * Props for the ComboBox component.
 */
interface ComboBoxProps {
    selectedValue: string;
    setSelectedValue: Function;
    setTypeList: Function;
    className?: string;
    query: any; // any disables type checking. Not good practice, but it works
    mappingFunction: (data: any) => string;

}


/**
 * A custom ComboBox selector component. It fetches data from the database and displays it in a ComboBox.
 *
 * @param selectedValue - The currently selected value.
 * @param setSelectedValue - A function to set the selected value.
 * @param setTypeList - A function to set the list of types. (for error handling)
 * @param className - The CSS class name for the component.
 * @param query - The GraphQL query for fetching data.
 * @param mappingFunction - A function to map the fetched data.
 * @returns The ComboBoxSelector component.
 */
export function ComboBoxDictionarySelector(props : ComboBoxProps) {
    const {selectedValue, setSelectedValue, setTypeList, className, query, mappingFunction} = props;
    const { loading, error, data } = useQuery(query);
    const [optionsList, setOptionsList] = useState<Array<string>>([]);

    useEffect(() => {
        if (data && Array.isArray(data.DictionaryAllByCategory)) {
            let listFromDB: Array<string> = data.DictionaryAllByCategory.map(mappingFunction);
            console.log(listFromDB);
            setOptionsList(listFromDB);
            setTypeList(listFromDB);
        }
    }, [data]);

  if (loading) return <Combobox className={`${className}`} data={optionsList} />;
  if (error) return <Combobox className={`${className}`} data={optionsList} />;

    return (
        <>
            <Combobox onChange={value => setSelectedValue(value)} value={selectedValue} data={optionsList} />
        </>
    );
}

/**
 * EXAMPLE OF USE: 
 *  <ComboBoxDictionarySelector
    selectedValue={formData.type}
    setSelectedValue={(value : string) => setFormData({...formData, type: value})}
    setTypeList={setTechnicianTypesList}
    className='text-input'
    query={GET_ALL_TECHNICIAN_TYPES}
    mappingFunction = {({label} : {label : string}) => label}
 */
