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
  disableDraggable?: boolean;
}
interface BladeTaskDraggableProps {
  style: any;
  id: number;
  taskName: string;
  disableDraggable?: boolean;
}

function BladeTaskCard(props: BladeTaskCardProps) {
  //Dynamic styling based on props values
  const cardStyle = {
    backgroundColor: props.projectColor,
    gridColumn: `date-${props.startDate.getFullYear()}-${props.startDate.getMonth()}-${props.startDate.getDate()} / span ${
      props.duration
    }`,
  };

  const droppableProps: BladeTaskDraggableProps = {
    style: cardStyle,
    id: props.id,
    taskName: props.taskName,
    disableDraggable: props.disableDraggable,
  };

  return <DraggableBladeTask {...droppableProps} />;
}
export default BladeTaskCard;

function DraggableBladeTask(props: BladeTaskDraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: props.disableDraggable,
  });
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

  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
};

  const handleEditClick = () => {
    console.log("Edit");
    setShowContextMenu(false);
  };

  const handleConflictClick = () => {
    console.log("Conflict");
    setShowContextMenu(false);
  }

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowContextMenu(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  };

  // Attach this handler to the window object to close the context menu
  
  

  return (
    <div className="bladeTaskCard" style={style} id={`${props.id}`} ref={setNodeRef}
        {...listeners}
        {...attributes}
        onContextMenu={handleRightClick}>
      <div>{props.taskName}</div>

      {showContextMenu && (
      <div ref={contextMenuRef} className="context-menu" style={{ left: `${contextMenuPosition.x}px`, top: `${contextMenuPosition.y}px` }}>
        <ul className="context-menu-list">
            <li className="context-menu-item" onClick={handleEditClick}>Edit</li>
            <li className="context-menu-item" onClick={handleConflictClick}>Conflict details</li>
            {/* Add more items as needed */}
        </ul>
    </div>
)}

  
    </div>
  );
}

// //dummy data
// let bladeTaskCards = [
//     <BladeTaskCard
//         key={"BT-1Rig1"} //BTCards skal have et unikt key for at fungere godt i react
//         duration={5} //måske vi skal overveje at lave dem på en anden måde
//         projectColor="blue"
//         taskName="BT-1"
//         startDate={new Date(2023, 10, 1)}
//         rig="Rig 1"
//         id={`blue-BT-1`}
//     />,
//     <BladeTaskCard

//         key={"BT-2Rig1"}
//         duration={40}
//         projectColor="blue"
//         taskName="BT-2"
//         startDate={new Date(2023, 10, 6)}
//         rig="Rig 1"
//         id={`blue-BT-2`}
//     />,
//     <BladeTaskCard
//         key={"BT-3Rig1"}
//         duration={10}
//         projectColor="red"
//         taskName="BT-1"
//         startDate={new Date(2023, 10, 20)}
//         rig="Rig 2"
//         id={`red-BT-1`}
//     />,
//     <BladeTaskCard
//         key={"BT-4Rig1"}
//         duration={10}
//         projectColor="red"
//         taskName="BT-2"
//         startDate={new Date(2023, 11, 1)}
//         rig="Rig 2"
//         id={`red-BT-2`}
//     />,
//     <BladeTaskCard
//         key={"BT-5Rig1"}
//         duration={2}
//         projectColor="green"
//         taskName="BT-3"
//         startDate={new Date(2023, 10, 29)}
//         rig="Rig 3"
//         id={`green-BT-3`}
//     />,
//     <BladeTaskCard
//         key={"BT-6Rig1"}
//         duration={2}
//         projectColor="green"
//         taskName="BT-1"
//         startDate={new Date(2023, 10, 1)}
//         rig="Rig 3"
//         id={`green-BT-1`}
//     />,
//     <BladeTaskCard
//         key={"BT-7Rig1"}
//         duration={5}
//         projectColor="green"
//         taskName="BT-2"
//         startDate={new Date(2023, 10, 3)}
//         rig="Rig 3"
//         id={`green-BT-2`}
//     />,
//     <BladeTaskCard
//         key={"BT-8Rig1"}
//         duration={15}
//         projectColor="brown"
//         taskName="BT-1"
//         startDate={new Date(2023, 10, 1)}
//         rig="Rig 4"
//         id={`brown-BT-1`}
//     />,
//     <BladeTaskCard
//         key={"BT-9Rig1"}
//         duration={15}
//         projectColor="brown"
//         taskName="BT-2"
//         startDate={new Date(2023, 10, 16)}
//         rig="Rig 5"
//         id={`brown-BT-2`}
//     />,
//     <BladeTaskCard
//         key={"BT-10Rig1"}
//         duration={2}
//         projectColor="red"
//         taskName="BT-3"
//         startDate={new Date(2023, 11, 11)}
//         rig="Rig 5"
//         id={`red-BT-3`}
//     />,
//     <BladeTaskCard
//         key={"BT-11Rig1"}
//         duration={5}
//         projectColor="blue"
//         taskName="BT-3"
//         startDate={new Date(2023, 11, 16)}
//         rig="Rig 5"
//         id={`blue-BT-3`}
//     />,
//     <BladeTaskCard
//         key={"BT-12Rig1"}
//         duration={3}
//         projectColor="cyan"
//         taskName="BT-1"
//         startDate={new Date(2023, 11, 1)}
//         rig="Rig 6"
//         id={`cyan-BT-1`}
//     />,
// ];
// export { bladeTaskCards };
