import React, { SetStateAction, Dispatch } from "react";

function CreateTestRigDivs(
    rigs: string[],
    dates: Date[],
    setDates: Dispatch<SetStateAction<Date[]>>
) {
    // Create a div for each test rig
    return (
        <div className="TestRigOverviewContainer">
            <div className="TestRigDateHeaderSpace"></div>

            {rigs.map((rig) => (
                <div className="TestRigOverviewElement" key={rig} id={rig}>
                    <h4>{rig}</h4>
                </div>
            ))}
        </div>
    );
}
export default createTestRigDivs;