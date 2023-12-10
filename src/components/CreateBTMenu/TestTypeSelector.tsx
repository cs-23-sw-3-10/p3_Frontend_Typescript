import { GET_TEST_TYPES } from '../../api/queryList';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { InErrorChart } from './BTMenuTypes';
import Combobox from "react-widgets/Combobox";
import "../../../node_modules/react-widgets/styles.css";
import "./TestTypeSelector.css"
import { sanitize } from '../../utils/StringEditing';



//Queries test types and insert them into the BT-Menu
function TestTypeSelector({ testType, setTestType, className, inErrorChart, setInErrorChart}: { testType: string, setTestType: Function, className?: string, inErrorChart:InErrorChart, setInErrorChart:Function}) {
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

    const hideErrorMessages = () => {
        let newInErrorChart = {...inErrorChart};
        newInErrorChart.testType = false;
        setInErrorChart(newInErrorChart);
    }

    const handleChange = (value:string) => {
        let santizedInput = sanitize(value);
        if(inErrorChart.testType){
            setTestType("Please Provide A Test Type");
        }else setTestType(santizedInput);
    }

    return (
        <>
            <Combobox className={className} onChange={value => handleChange(value)} value={testType} data={typesList} onSelect={hideErrorMessages}/>
        </>
    );
}

export default TestTypeSelector;