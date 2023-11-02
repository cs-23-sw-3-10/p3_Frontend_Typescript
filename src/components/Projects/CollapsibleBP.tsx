import React, { useState } from 'react';

/**
 * 
 * @param {*} BP the information about the blade project is passed to this function 
 * @returns a collapsible table with the information about the blade project
 */
function CollapsibleBP(BP: any) {
    const [open, setOPen] = useState(false);
    const toggle = () => {
        setOPen(!open);
      };
    return(
        <div>
            <button onClick={toggle}>{!open ? "more info" : "close"}</button>
            {open && <div>
            <table>
                <td>{BP.startDate}</td>
                <td>{BP.endDate}</td>
                <td>{BP.duration}</td>
            </table> <button>Delete</button>
                
            </div>
            }
        </div>
    )
}
export default CollapsibleBP;