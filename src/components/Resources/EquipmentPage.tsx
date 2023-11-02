import React from "react";

/**
 * 
 * @returns a table with all the equipment
 */
function EquipmentPage() {
    //her skal der vel læses noget ind fra databasen og så vises i en tabel
    const equipment = ["equipment1", "equipment2", "equipment3", "equipment4"];

    return (
        <>
                <h1>Equipment Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Equipment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Type</td>
                        <td>ID</td>
                        <td>Availability</td>
                        <td>Calibration date</td>
                    </tr>
                    {equipment.map((equipment) => (
                        <tr key={equipment}>
                            <td>{equipment}</td>
                            <td>{equipment}-ID</td>
                            <td>sure</td>
                            <td>nej</td>
                            <button>Calibrated</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
export default EquipmentPage;