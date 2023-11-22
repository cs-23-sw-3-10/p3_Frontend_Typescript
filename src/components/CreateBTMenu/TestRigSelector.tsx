import { GET_TEST_RIGS } from '../../api/queryList';
import { useQuery } from '@apollo/client';


function TestRigSelector({setTestRig}:{setTestRig:Function}) {
    return (
        <>
            <h2 className="title">Test Rig</h2>
            <select className="input_sideborders" id="testrig" name="testrig" onChange={(e) => setTestRig(Number(e.currentTarget.value))}>
                <TestRigOptions />
            </select>
        </>
    );
}

//Queries test types and insert them into the BT-Menu
function TestRigOptions() {
    const { loading, error, data } = useQuery(GET_TEST_RIGS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if (loading) return (<option value="LOADING">LOADING</option>);

    //Error returns an empty list
    if (error) {
        console.log(error.message);
        return (<option value="LOADING">ERROR</option>);
    }

    //We get the number of test rigs as a string -> Converted into number -> Then into an array [1..NumberOfTestRigs]
    let NumberOfTestRigs: number = Number(data.DictionaryAllByCategory[0].label);
    let TestRigArray = Array(NumberOfTestRigs);
    for (let i = 0; i < NumberOfTestRigs; i++) { TestRigArray[i] = i+1 };


    //Returns a dropdown of all the testrigs present in DB
    return <>{TestRigArray.map((TestRigNum) => (<option value={TestRigNum} key={TestRigNum}>Test Rig {TestRigNum}</option>))}</>;

}
export default TestRigSelector;