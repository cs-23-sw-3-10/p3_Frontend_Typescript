import React from 'react';
import CollapsibleBP from "../Projects/CollapsibleBP";

/**
 * 
 * @returns a table with all the blade projects
 */
function BPOverviewPage() {
    //her skal vi indlæse data fra databasen om BPs
    const bladePjrojects = [
        {
            id: 1,
            name: "BP1",
            startDate: "01-01-2020",
            endDate: "02-01-2020",
            duration: "100"
        },
        {
            id: 2,
            name: "BP2",
            startDate: "01-01-2020",
            endDate: "03-01-2020",
            duration: "15"
        }
    ];

  return (
    <div>
      <h1>Project overview</h1>
      
      <table>
                <thead>
                    <tr>
                        <th>Blade Projects</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>Project name</td>
                    </tr>
                    {bladePjrojects.map((BP) => (
                        <tr key={BP.id + BP.name}>
                            <td>{BP.id}</td>
                            <td>{BP.name}</td>
                            <div>
                                <td>{CollapsibleBP(BP)}</td>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  );
}

export default BPOverviewPage;