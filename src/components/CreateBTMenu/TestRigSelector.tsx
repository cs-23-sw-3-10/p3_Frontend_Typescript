import {GET_TEST_RIGS} from '../../api/queryList';
import { useQuery} from '@apollo/client';


//Queries test types and insert them into the BT-Menu
function TestRigOptions(){
    const { loading, error, data} = useQuery(GET_TEST_RIGS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if(loading) return( <option value="LOADING">LOADING</option>);

    //Error returns an empty list
    if(error){
        console.log(error.message);
        return (<option value="LOADING">ERROR</option>);
    }
    
    //We get the number of test rigs as a string -> Converted into number -> Then into an array [1..NumberOfTestRigs]
    let NumberOfTestRigs:number = Number(data.DictionaryAllByCategory[0].label);
    let TestRigArray = Array(NumberOfTestRigs);
    for(let i = 1; i <= NumberOfTestRigs; i++){TestRigArray[i] = i};


    //Returns a dropdown of all the testrigs present in DB
    return <>{TestRigArray.map((TestRigNum) => ( <option value={"tr" + TestRigNum} key={TestRigNum}>Test Rig {TestRigNum}</option> ) )}</>;

}
export default TestRigOptions;