
function createTestRigDivs(rigs: string[]) {
    // Create a div for each test rig
    return (
        <div className="TestRigContainer">
            <div className="dateSpace"></div>
            {rigs.map((rig) => (
                <div className="TestRig">
                    <h4>{rig}</h4>
                </div>
            ))
            }
        </div>
    );
}
export default createTestRigDivs;