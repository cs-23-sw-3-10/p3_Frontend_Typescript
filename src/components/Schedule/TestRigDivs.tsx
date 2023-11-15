import { type } from "os";
import React, { SetStateAction, Dispatch } from "react";

type TestRigDivsProps = {
    rigs: string[];
};

function CreateTestRigDivs(
    props: TestRigDivsProps,
) {
    // Create a div for each test rig
    return (
        <div className="TestRigOverviewContainer">
            <div className="TestRigDateHeaderSpace"></div>

            {props.rigs.map((rig) => (
                <div className="TestRigOverviewElement" key={rig} id={rig}>
                    <h4>{rig}</h4>
                </div>
            ))}
        </div>
    );
}
export default CreateTestRigDivs;