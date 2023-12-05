import { useEffect, useState } from "react";
import { GET_TEST_RIGS } from "../../api/queryList";
import { useQuery } from "@apollo/client";

function TestRigSelector({ testRig, setTestRig }: { testRig: number; setTestRig: Function }) {
    const { loading, error, data } = useQuery(GET_TEST_RIGS);
    const [numberOfTestRigs, setNumberOfTestRigs] = useState<any>(0);

    useEffect(() => {
        //We get the number of test rigs as a string -> Converted into number
        setNumberOfTestRigs(Number(data.DictionaryAllByCategory[0].label));
    }, [data]);

    //Whilst list is loading -> Return empty selector menu
    if (loading) return <select className="input_sideborders" id="testrig" name="testrig"></select>

    //Error -> return empty selector menu
    if (error) {
        return <select className="input_sideborders" id="testrig" name="testrig"></select>
    }
    return (
        <>
            <h2 className="title">Test Rig</h2>
            <select className="input_sideborders" id="testrig" name="testrig" value={testRig} onChange={(e) => setTestRig(Number(e.currentTarget.value))}>
                <TestRigOptions numberOfTestRigs={numberOfTestRigs} />
            </select>
        </>
    );
}

//Queries test types and insert them into the BT-Menu
function TestRigOptions({numberOfTestRigs}: { numberOfTestRigs: number }) {
    //Number of test rigs converted into an array [1..NumberOfTestRigs]
    let TestRigArray = Array(numberOfTestRigs);
    for (let i = 1; i <= numberOfTestRigs; i++) {
        TestRigArray[i - 1] = i;
    }

    //Returns a dropdown of all the testrigs present in DB
    return (
        <>
            {TestRigArray.map((testRigNum) => (
                <option value={testRigNum} key={testRigNum}>
                    Test Rig {testRigNum}
                </option>
            ))}
        </>
    );
}
export default TestRigSelector;
