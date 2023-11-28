import { GET_TEST_TYPES } from '../../api/queryList';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Combobox from "react-widgets/Combobox";
import "../../../node_modules/react-widgets/styles.css";
import "./TestTypeSelector.css"



//Queries test types and insert them into the BT-Menu
function TestTypeSelector({ testType, setTestType, className}: { testType: string, setTestType: Function, className?: string }) {
    const { loading, error, data } = useQuery(GET_TEST_TYPES);
    const [typesList, setTypesList] = useState<string[]>([]);

    useEffect(() => {
        if (data && data.DictionaryAllByCategory) {
            let listFromDB: Array<string> = data.DictionaryAllByCategory.map(({ label }: { label: string }) => label);
            setTypesList(listFromDB);
        }
    }, [data]);
    
    if (loading) return (<Combobox className={`${className}`} data={typesList} />);
    if (error) return (<Combobox className={`${className}`} data={typesList} />);

    return (
        <>
            <Combobox className={className} onChange={value => setTestType(value)} value={testType} data={typesList} />
        </>
    );
}

export default TestTypeSelector;