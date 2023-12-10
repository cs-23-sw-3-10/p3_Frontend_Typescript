type TestRigDivsProps = {
    rigs: { rigName: string; rigNumber: number }[];
};

function CreateTestRigDivs(props: TestRigDivsProps) {
    // Create a div for each test rig
    return (
        <div className="TestRigOverviewContainer">
            <div className="TestRigDateHeaderSpace"></div>

            {props.rigs.map((rig) => (
                <div className="TestRigOverviewElement" key={rig.rigName} id={rig.rigName}>
                    <h4>{rig.rigName}</h4>
                </div>
            ))}
        </div>
    );
}
export default CreateTestRigDivs;
