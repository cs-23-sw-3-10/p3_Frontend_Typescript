import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Combobox } from "react-widgets/cjs";



/**
 * Props for the ComboBox component.
 */
interface ComboBoxProps {
    selectedValue: string;
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
    query: any; // any disables type checking. Not good practice, but it works
    mappingFunction: (data: any) => string;
}

/**
 * A custom ComboBox selector component.
 *
 * @param props - The component props.
 * @param props.selectedValue - The currently selected value.
 * @param props.setSelectedValue - A function to set the selected value.
 * @param props.className - The CSS class name for the component.
 * @param props.query - The GraphQL query for fetching data.
 * @param props.mappingFunction - A function to map the fetched data.
 * @returns The ComboBoxSelector component.
 */
function ComboBoxSelector(props : ComboBoxProps) {
    const {selectedValue, setSelectedValue, className, query, mappingFunction} = props;
    const { loading, error, data } = useQuery(query);
    const [optionsList, setOptionsList] = useState<Array<string>>([]);

    useEffect(() => {
        if (data) {
            let listFromDB: Array<string> = data.map(mappingFunction);
            setOptionsList(listFromDB);
        }
    }, [data, mappingFunction]);

  if (loading) return <Combobox className={`${className}`} data={optionsList} />;
  if (error) return <Combobox className={`${className}`} data={optionsList} />;

    return (
        <>
            <Combobox onChange={value => setSelectedValue(value)} value={selectedValue} data={optionsList} />
        </>
    );
}