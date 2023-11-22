import { GET_TEST_TYPES } from '../../api/queryList';
import { useQuery } from '@apollo/client';


//Queries test types and insert them into the BT-Menu
function TestTypeSelector({ setTestType }: { setTestType: Function }) {
    return (
        <div className="item testtype_wrapper">
            <h2 className="title">Type</h2>
            <select className="testtype_select input_sideborders" id="testtype" name="testtype" onChange={(e) => setTestType(e.currentTarget.value)}>
                <TestTypeOptions />
            </select>
        </div>
    );
}


function TestTypeOptions() {
    const { loading, error, data } = useQuery(GET_TEST_TYPES);

    //Whilst list is loading, the only element in the list is "LOADING"
    if (loading) return (<option value="LOADING">LOADING</option>);

    //Error returns an empty list
    if (error) {
        console.log(error.message);
        return (<option>Error</option>);
    }

    //Used to give keys to elements in the list
    let key = 1;

    //Returns a dropdown of all the test types present in DB
    return data.DictionaryAllByCategory.map(({ label }: { label: string }) => (<option value={label.toString()} key={key++}>{label}</option>));
}
export default TestTypeSelector;