import {GET_TEST_TYPES} from '../../api/queryList';
import { useQuery} from '@apollo/client';


//Queries test types and insert them into the BT-Menu
function TestTypeOptions(){
    const { loading, error, data} = useQuery(GET_TEST_TYPES);

    //Whilst list is loading, the only element in the list is "LOADING"
    if(loading) return(<option value="LOADING">LOADING</option>);

    //Error returns an empty list
    if(error){
        console.log(error.message);
        return (<option>Error</option>);
    }
    
    //Used to give keys to elements in the list
    let key = 1;

    //Returns a dropdown of all the test types present in DB
    return data.DictionaryAllByCategory.map(({label}:{label:string}) => ( <option value={label.toString()} key={key++}>{label}</option> ));
}
export default TestTypeOptions;