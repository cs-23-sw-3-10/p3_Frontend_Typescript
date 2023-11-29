import { GET_TEST_RIGS } from '../../api/queryList';
import { useQuery } from '@apollo/client';

function TestRigSelector({testRig, setTestRig}:{testRig: number, setTestRig:Function}) {
    return (
        <>
            <h2 className="title">Test Rig</h2>
            <select className="input_sideborders" id="testrig" name="testrig" value={testRig} onChange={(e) => setTestRig(Number(e.currentTarget.value))}>
                <TestRigOptions testRig={testRig} setTestRig={setTestRig} />
            </select>
        </>
    );
}

//Queries test types and insert them into the BT-Menu
function TestRigOptions({testRig, setTestRig}:{testRig:number, setTestRig:Function}) {
    const { loading, error, data } = useQuery(GET_TEST_RIGS);

    //Whilst list is loading, the only element in the list is "LOADING"
    if (loading) return (<option value="LOADING">LOADING</option>);

    //Error returns an empty list
    if (error) {
        return (<option value="LOADING">ERROR</option>);
    }

    //We get the number of test rigs as a string -> Converted into number -> Then into an array [1..NumberOfTestRigs]
    let NumberOfTestRigs: number = Number(data.DictionaryAllByCategory[0].label);
    let TestRigArray = Array(NumberOfTestRigs);
    for (let i = 0; i < NumberOfTestRigs; i++) { TestRigArray[i] = i+1 };

    //Set initial value as first value from API-call
    if(testRig === 0){
        setTestRig(TestRigArray[0]);
    }

    //Returns a dropdown of all the testrigs present in DB
    return <>{TestRigArray.map((TestRigNum) => (<option value={TestRigNum} key={TestRigNum}>Test Rig {TestRigNum}</option>))}</>;

}
export default TestRigSelector;