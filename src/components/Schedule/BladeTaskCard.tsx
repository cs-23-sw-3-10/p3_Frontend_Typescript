import "./BladeTaskCard.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useState, useRef, useEffect } from "react";
import MessageBox from "../ui/MessageBox";
import PopupWindow from "../ui/PopupWindow";
import { ResourceOrder } from "../CreateBTMenu/BTMenuTypes";
import EditBTComponent from "../ui/EditBTComponent";
import { dateDivLength } from "./TimelineField";
import { GET_CONFLICTS_FOR_BT } from "../../api/queryList";
import { useQuery } from "@apollo/client";
import { useEditModeContext } from "../../EditModeContext";

//interface used to define the types of the props of BladeTaskCard
export interface BladeTaskCardProps {
    startDate?: Date;
    endDate?: Date;
    duration: number;
    attachPeriod: number;
    detachPeriod: number;
    rig?: number;
    projectColor: string;
    projectId: number;
    projectName?: string;
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
    const editMode = useEditModeContext();
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

    const {
        loading: loadingConflicts,
        error: errorConflicts,
        data: dataConflicts,
        refetch: refetchConflicts,
    } = useQuery(GET_CONFLICTS_FOR_BT, {
        variables: {
            id: props.id,
            isActive: !editMode.isEditMode,
        },
    });

    if (loadingConflicts) {
        return <p>Loading...</p>;
    }
    if (errorConflicts) {
        return <p>Error {errorConflicts.message}</p>;
    }

    const handleMessageClose = () => {
        setShowMessageBox(false);
    };

    const handleEditClick = () => {
        togglePopup();
        setShowContextMenu(false);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleConflictClick = () => {
        setShowContextMenu(false);
        setShowMessageBox(true);
    };

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setShowContextMenu(true);
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const getMessages = () => {
        refetchConflicts();
        return extractConflictMessages(dataConflicts.findConflictsForBladeTask);
    };

    //Dynamic styling based on props values
    if (props.startDate) {
        const cardStyle = {
            backgroundColor: props.shown ? props.projectColor : "grey",
            gridColumn: `date-${props.startDate.getFullYear()}-${props.startDate.getMonth()}-${props.startDate.getDate()} / span ${props.duration}`,
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
                {showContextMenu && editMode.isEditMode && (
                    <div
                        ref={contextMenuRef}
                        className="context-menu"
                        style={{
                            left: `${contextMenuPosition.x}px`,
                            top: `${contextMenuPosition.y}px`,
                        }}
                    >
                        <ul className="context-menu-list">
                            <li className="context-menu-item" onClick={handleEditClick}>
                                Edit
                            </li>
                            {props.inConflict && (
                                <li className="context-menu-item" onClick={handleConflictClick}>
                                    Conflict details
                                </li>
                            )}
                            {/* Add more items as needed */}
                        </ul>
                    </div>
                )}
                {showMessageBox && <MessageBox title={props.taskName} messages={getMessages()} onClose={handleMessageClose} />}
                {showPopup && <PopupWindow onClose={togglePopup} component={<EditBTComponent bladeTaskID={props.id} />} />}
            </>
        );
    } else {
        const cardStyle = {
            backgroundColor: props.shown ? props.projectColor : "grey",
            width: `${props.duration * dateDivLength}px`,
            border: props.inConflict ? "2px dashed red" : "",
            gridRow: `project-${props.projectName}`,
            gridColumn: "2",
            justifyContent: "left",
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
                    <div ref={contextMenuRef} className="context-menu" style={{ left: `${contextMenuPosition.x}px`, top: `${contextMenuPosition.y}px` }}>
                        <ul className="context-menu-list">
                            <li className="context-menu-item" onClick={handleEditClick}>
                                Edit
                            </li>
                            {/* Add more items as needed */}
                        </ul>
                    </div>
                )}
            </>
        );
    }
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
        <div className="bladeTaskCard" style={style} id={`${props.id}`} ref={setNodeRef} {...listeners} {...attributes} onContextMenu={props.setContextMenu}>
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
        <div className="bladeTaskCard" style={style} id={`${props.id}`} ref={setNodeRef} {...listeners} {...attributes} onContextMenu={props.setContextMenu}>
            <div className="BT-Name"></div>
        </div>
    );
}

interface ConflictProps {
    message: string;
    __typename: string;
}

function extractConflictMessages(conflicts: ConflictProps[]) {
    const messages: string[] = [];

    //For testeing
    const loremIpsum =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu varius purus. Nunc laoreet neque eget porta ultricies. Nam diam enim, cursus id efficitur quis, efficitur eu ante. Integer dapibus, est non semper vehicula, quam mauris molestie nibh, a malesuada magna dui eu lectus. Donec porttitor consequat neque vitae condimentum. Praesent eleifend nisl sed odio pellentesque, in tristique lectus semper. Cras mollis, ligula sed consectetur iaculis, nisl justo ultrices nibh, vel condimentum mauris lacus non ante. Aliquam posuere eu nisl quis luctus. Vivamus mollis eu elit in mollis. Aenean ultrices porta mi nec volutpat. Fusce quis arcu venenatis, aliquet enim. ";

    for (let i = 0; i < conflicts.length; i++) {
        messages.push(conflicts[i].message);
    }
    return messages;
}
