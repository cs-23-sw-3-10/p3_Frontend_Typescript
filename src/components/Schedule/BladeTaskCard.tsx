import "./BladeTaskCard.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useState, useRef, useEffect } from "react";
import MessageBox from "../ui/MessageBox";
import PopupWindow from "../ui/PopupWindow";
import { ResourceOrder } from "../CreateBTMenu/BTMenuTypes";
//interface used to define the types of the props of BladeTaskCard
export interface BladeTaskCardProps {
    startDate: Date;
    endDate?: Date;
    duration: number;
    attachPeriod: number;
    detachPeriod: number;
    rig?: number;
    projectColor: string;
    projectId: number;
    customer: string;
    taskName: string;
    id: number;
    shown?: boolean;
    inConflict?: boolean;
    enableDraggable?: boolean;
    setContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    resourceOrders?: Array<ResourceOrder>;
    testType?: string;
}
interface BladeTaskDraggableProps {
    style: any;
    id: number;
    taskName: string;
    attachPeriod: number;
    detachPeriod: number;
    enableDraggable?: boolean;
    inConflict?: boolean;
    shown?: boolean;
    setContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function BladeTaskCard(props: BladeTaskCardProps) {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({
        x: 0,
        y: 0,
    });
    const [showMessageBox, setShowMessageBox] = useState(false); // Used to show the message box when the user clicks on a task card
    const [showPopup, setShowPopup] = useState(false); // Used to show the popup when the user clicks edit in a task card
    const contextMenuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Function to check if click is outside the context menu
        const handleClickOutside = (event: MouseEvent) => {
            if (
                contextMenuRef.current &&
                !contextMenuRef.current.contains(event.target as Node)
            ) {
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

    const handleMessageClose = () => {
        setShowMessageBox(false);
    };

    const handleEditClick = () => {
        console.log("Edit " + props.taskName);
        console.log(props.inConflict);
        togglePopup();
        setShowContextMenu(false);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleConflictClick = () => {
        console.log("Conflict " + props.taskName);
        setShowContextMenu(false);
        setShowMessageBox(true);
    };

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setShowContextMenu(true);
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
    };

    //Dynamic styling based on props values
    const cardStyle = {
        backgroundColor: props.shown ? props.projectColor : "grey",
        gridColumn: `date-${props.startDate.getFullYear()}-${props.startDate.getMonth()}-${props.startDate.getDate()} / span ${
            props.duration //+ props.attachPeriod + props.detachPeriod //kan tilføjes/fjernes hvis duraation kun er for testen
        }`,
        border: props.inConflict ? "2px dashed red" : "",
    };

    const droppableProps: BladeTaskDraggableProps = {
        style: cardStyle,
        id: props.id,
        taskName: props.taskName,
        enableDraggable: props.enableDraggable,
        setContextMenu: handleRightClick,
        shown: props.shown,
        attachPeriod: props.attachPeriod ? props.attachPeriod : 0,
        detachPeriod: props.detachPeriod ? props.detachPeriod : 0,
    };

    return (
        <>
            <DraggableBladeTask {...droppableProps} />
            {showContextMenu && (
                <div
                    ref={contextMenuRef}
                    className="context-menu"
                    style={{
                        left: `${contextMenuPosition.x}px`,
                        top: `${contextMenuPosition.y}px`,
                    }}
                >
                    <ul className="context-menu-list">
                        <li
                            className="context-menu-item"
                            onClick={handleEditClick}
                        >
                            Edit
                        </li>
                        {props.inConflict && (
                            <li
                                className="context-menu-item"
                                onClick={handleConflictClick}
                            >
                                Conflict details
                            </li>
                        )}
                        {/* Add more items as needed */}
                    </ul>
                </div>
            )}
            {showMessageBox && (
                <MessageBox
                    message={"Insert conflict information here"}
                    onClose={handleMessageClose}
                />
            )}
            {showPopup && <PopupWindow onClose={togglePopup} bladeTaskID={props.id}/>}

        </>
    );
}
export default BladeTaskCard;

function DraggableBladeTask(props: BladeTaskDraggableProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
        disabled: !props.enableDraggable,
    });

    const style = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
    };

    // Attach this handler to the window object to close the context menu
    return props.shown ? (
        <div
            className="bladeTaskCard"
            style={style}
            id={`${props.id}`}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onContextMenu={props.setContextMenu}
        >
            {/* {used to visualize the attach period} */}
            <div
                className="attachPeriod"
                style={{
                    maxWidth: `${props.attachPeriod * 25}px`,
                    minWidth: `${props.attachPeriod * 25}px`,
                }}
            ></div>
            <div className="BT-Name">{props.taskName}</div>
            {/* {used to visualize the detach period} */}
            <div
                className="detachPeriod"
                style={{
                    maxWidth: `${props.detachPeriod * 25}px`,
                    minWidth: `${props.detachPeriod * 25}px`,
                }}
            ></div>
        </div>
    ) : (
        <div
            className="bladeTaskCard"
            style={style}
            id={`${props.id}`}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onContextMenu={props.setContextMenu}
        >
            <div className="BT-Name"></div>
        </div>
    );
}
