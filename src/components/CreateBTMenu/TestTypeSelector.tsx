import { GET_TEST_TYPES } from '../../api/queryList';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Combobox from "react-widgets/Combobox";


//Queries test types and insert them into the BT-Menu
function TestTypeSelector({ testType, setTestType }: { testType: string, setTestType: Function }) {
    const { loading, error, data } = useQuery(GET_TEST_TYPES);
    const [typesList, setTypesList] = useState<string[]>([]);
    
    useEffect(() => {
        if (data && data.DictionaryAllByCategory) {
            let listFromDB: Array<string> = data.DictionaryAllByCategory.map(({ label }: { label: string }) => label);
            setTypesList(listFromDB);
        }
    }, [data]);
    
    if (loading) return (<Combobox className="testtype_select input_sideborders" data={typesList} />);
    if (error) return (<Combobox className="testtype_select input_sideborders" data={typesList} />);

    return (
        <div className="item testtype_wrapper">
            <h2 className="title">Type</h2>
            <Combobox className="testtype_select input_sideborders" onChange={value => setTestType(value)} value={testType} data={typesList} />
        </div>
    );
}

export default TestTypeSelector;