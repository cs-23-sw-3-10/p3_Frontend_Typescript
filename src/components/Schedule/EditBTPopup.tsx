import React, { useState } from 'react';
import BladeTaskMenu from "../CreateBTMenu/BladeTaskMenu";

type EditBTPopupProps = {
    onClose: () => void;
};

function EditBTPopup(props: EditBTPopupProps) {
    // State to store the position
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);

    // Function to update position on drag
    const onDrag = (e:any) => {
        if (dragging) {
            setPosition({
                x: position.x + e.movementX,
                y: position.y + e.movementY
            });
        }
    };

    // Start dragging
    const startDrag = () => setDragging(true);

    // Stop dragging
    const stopDrag = () => setDragging(false);

    return (
        <div 
            className="EditBTPopup" 
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            style={{ position: 'fixed', left: `${position.x}px`, top: `${position.y}px` }}
            
        >
            <div className="EditBTPopupContent" >
                <BladeTaskMenu/>
                
            </div>
            <button className="EditBTPopupCloseButton" onClick={props.onClose}>Close</button>
            <div className='dragField' onMouseDown={startDrag}></div>
        </div>
    );
}

export default EditBTPopup;