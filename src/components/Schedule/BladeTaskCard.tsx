import "./BladeTaskCard.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useState, useRef, useEffect } from "react";

//interface used to define the types of the props of BladeTaskCard
interface BladeTaskCardProps {
  startDate: Date;
  endDate?: Date;
  duration: number;
  attachPeriod?: number;
  detachPeriod?: number;
  rig?: number;
  projectColor: string;
  customer: string;
  taskName: string;
  id: number;
  inConflict?: boolean;
  disableDraggable?: boolean;
  setContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  

}
interface BladeTaskDraggableProps {
  style: any;
  id: number;
  taskName: string;
  disableDraggable?: boolean;
  inConflict?: boolean;
  setContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function BladeTaskCard(props: BladeTaskCardProps) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Function to check if click is outside the context menu
    const handleClickOutside = (event: MouseEvent) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
            setShowContextMenu(false);
        }
    };

    

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);


const handleEditClick = () => {
    console.log("Edit " + props.taskName);
    console.log(props.inConflict);

    setShowContextMenu(false);
  };

  const handleConflictClick = () => {
    console.log("Conflict " + props.taskName);
    setShowContextMenu(false);
  }

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowContextMenu(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };



  
  //Dynamic styling based on props values
  const cardStyle = {
    backgroundColor: props.projectColor,
    gridColumn: `date-${props.startDate.getFullYear()}-${props.startDate.getMonth()}-${props.startDate.getDate()} / span ${
      props.duration
    }`,
    border: props.inConflict ? '2px dashed red' : '', 
  };

  const droppableProps: BladeTaskDraggableProps = {
    style: cardStyle,
    id: props.id,
    taskName: props.taskName,
    disableDraggable: props.disableDraggable,
    setContextMenu: handleRightClick,
  };

  return(<><DraggableBladeTask {...droppableProps} />
  {showContextMenu && (
      <div ref={contextMenuRef} className="context-menu" style={{ left: `${contextMenuPosition.x}px`, top: `${contextMenuPosition.y}px` }}>
        <ul className="context-menu-list">
            <li className="context-menu-item" onClick={handleEditClick}>Edit</li>
            {props.inConflict && <li className="context-menu-item" onClick={handleConflictClick}>Conflict details</li>}
            {/* Add more items as needed */}
        </ul>
    </div>
)}
  </>
  );
  
  
}
export default BladeTaskCard;

function DraggableBladeTask(props: BladeTaskDraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: props.disableDraggable,
  });
  

 

  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
};

 



  // Attach this handler to the window object to close the context menu
  
  

  return (
    <div className="bladeTaskCard" style={style} id={`${props.id}`} ref={setNodeRef}
        {...listeners}
        {...attributes}
        onContextMenu={props.setContextMenu}>
      <div>{props.taskName}</div>

      

  
    </div>
  );
}

