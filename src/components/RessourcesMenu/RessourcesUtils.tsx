import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Combobox } from "react-widgets/cjs";
import './Ressource.css';
import '../../../node_modules/react-widgets/styles.css';

/**
 * Props for the ComboBoxSelector component.
 */
interface ComboBoxProps {
    selectedValue: string;
    setSelectedValue: Function;
    setItemList: Function;
    className?: string;
    query: any; // any disables type checking. Not good practice, but it works
    queryVariables?: any; // includes the variables for the query
    dataKey: string; // New prop to specify the key in the data object
    mappingFunction: (data: any) => string;

}

/**
 * A custom ComboBox selector component. It fetches data from the database and displays it in a ComboBox.
 *
 * @param selectedValue - The currently selected value.
 * @param setSelectedValue - A function to set the selected value.
 * @param setItemList - A function to set the list of types. (for error handling)
 * @param className - The CSS class name for the component.
 * @param query - The GraphQL query for fetching data.
 * @param dataKey - The key in the data object. For example, if the data object is {data: {DictionaryAllByCategory: [...]}} then the dataKey is "DictionaryAllByCategory
 * @param queryVariables - The variables for the GraphQL query.
 * @param mappingFunction - A function to map the fetched data.
 * @returns The ComboBoxSelector component.
 * @example
 * 
 *  <ComboBoxDictionarySelector
        selectedValue={formData.type}
        setSelectedValue={(value : string) => setFormData({...formData, type: value})}
        setTypeList={setTechnicianTypesList}
        className='text-input'
        query={GET_ALL_TECHNICIAN_TYPES}
        dataKey='DictionaryAllByCategory'
        mappingFunction = {({label} : {label : string}) => label}
    />
 */
export function ComboBoxSelector(props : ComboBoxProps) {
    const {selectedValue, setSelectedValue, setItemList, className, query, dataKey, queryVariables, mappingFunction} = props;
    const { loading, error, data, refetch} = useQuery(query, {variables: queryVariables});
    const [optionsList, setOptionsList] = useState<Array<string>>([]);
    //console.log(data);

    useEffect(() => {
        if (data && Array.isArray(data[dataKey])) {
            let listFromDB: Array<string> = data[dataKey].map(mappingFunction);
            setOptionsList(listFromDB);
            setItemList(listFromDB);
        }
    }, [data, selectedValue]);

  if (loading) return <Combobox className={`${className}`} data={optionsList} />;
  if (error) return <Combobox className={`${className}`} data={optionsList} />;

    return (
        <>
            <Combobox onChange={value => setSelectedValue(value)} value={selectedValue} data={optionsList} />
        </>
    );
}

export function SanitizeString(str: string) : string {
    //Accept only alphanumeric and space and - and _
    let output : string = str.replace(/[^a-zA-Z0-9-_ ]/g, "")
    return output;
}
