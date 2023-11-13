function createTestRigDivs(rigs: string[]) {
    // Create a div for each test rig
    return (
        <div className="TestRigOverviewContainer">
            <div className="TestRigDateHeaderSpace"></div>
            
            {rigs.map((rig) => (
                <div className="TestRigOverviewElement"
                    id={rig}>
                    <h4>{rig}</h4>
                </div>
            ))
            }
            <div className="TestRigOverviewElement" style={{height: "16px"}}></div> {/*Filling out empty area */}
        </div>
    );
}
export default createTestRigDivs;