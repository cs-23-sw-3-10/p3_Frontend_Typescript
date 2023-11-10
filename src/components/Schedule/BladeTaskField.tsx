function createBladeTaskField(rigs: string[]) {
    return (
        <div className="BladeTaskField">
            <div className="datesContainer"></div>
            {rigs.map((rig) => (
                <div className="Rig-BTField">
                    <h4>{rig}</h4>
                </div>
            ))
            }
        </div>
    );
}
export default createBladeTaskField;