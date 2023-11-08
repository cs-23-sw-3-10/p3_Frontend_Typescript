import {GET_TEST_RIGS} from '../../api/queryList';
import { useQuery} from '@apollo/client';


//Queries test types and insert them into the BT-Menu
function TestRigSelector(){
    const { loading, error, data} = useQuery(GET_TEST_RIGS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if(loading) return(
        <select id="testrig" name="testrig">
            <option value="LOADING">LOADING</option>
        </select>
    );

    //Error returns an empty list
    if(error){
        console.log(error.message);
        return (<div>Error</div>);
    }
    
    //Used to give keys to elements in the list
    let NumberOfTestRigs:number = Number(data.DictionaryAllByCategory[0].label);
    let TestRigArray = Array(NumberOfTestRigs);
    for(let i = 1; i <= NumberOfTestRigs; i++){TestRigArray[i] = i};

    //Returns a dropdown of all the testrigs present in DB
    return(
        <select id="testrig" name="testrig">
            {TestRigArray.map((TestRigNum) => (
                <option value={"tr" + TestRigNum} key={TestRigNum}>Test Rig {TestRigNum}</option>
            ))}
        </select>
    );

}
    /* Template Element If Fetch Stops Working - Easier to style with
        
        <select id="testrig" name="testrig">
            <option value="tr1">Test Rig 1</option>
            <option value="tr2">Test Rig 2</option>
            <option value="tr3">Test Rig 3</option>
            <option value="tr4">Test Rig 4</option>
            <option value="tr5">Test Rig 5</option>
            <option value="tr5">Test Rig 6</option>
        </select>
    */
 
export default TestRigSelector;