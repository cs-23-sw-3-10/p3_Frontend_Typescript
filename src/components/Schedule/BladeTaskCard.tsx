import "./BladeTaskCard.css";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

//interface used to define the types of the props of BladeTaskCard
interface BladeTaskCardProps {
    startDate: Date;
    duration: number;
    attachPeriod?: number;
    detachPeriod?: number;
    rig?: string;
    projectColor: string;
    taskName: string;
}
interface BladeTaskDroppableProps {
    style: any;
    id: string;
    taskName: string;
}

function BladeTaskCard(props: BladeTaskCardProps) {
    //Dynamic styling based on props values
    const cardStyle = {
        backgroundColor: props.projectColor,
        gridColumn: `date-${props.startDate.getFullYear()}-${props.startDate.getMonth()}-${props.startDate.getDate()} / span ${
            props.duration
        }`,
    };

    const droppableProps: BladeTaskDroppableProps = {
        style: cardStyle,
        id:
            props.taskName +
            "-" +
            props.rig +
            "-" +
            props.startDate +
            props.projectColor,
        taskName: props.taskName,
    };

    return <Draggable {...droppableProps} />;
}
export default BladeTaskCard;

function Draggable(props: BladeTaskDroppableProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            className="bladeTaskCard"
            
            style={style}
            id={props.id}
            
        >
            <div className="bladeTaskCardHandle" ref={setNodeRef} {...listeners} {...attributes}></div>
            <div>{props.taskName}</div>
        </div>
    );
}

//dummy data
let bladeTaskCards = [
    <BladeTaskCard
        key={"BT-1Rig1"} //BTCards skal have et unikt key for at fungere godt i react
        duration={5} //måske vi skal overveje at lave dem på en anden måde
        projectColor="blue"
        taskName="BT-1"
        startDate={new Date(2023, 10, 1)}
        rig="Rig 1"
    />,
    <BladeTaskCard
        key={"BT-2Rig1"}
        duration={40}
        projectColor="blue"
        taskName="BT-2"
        startDate={new Date(2023, 10, 6)}
        rig="Rig 1"
    />,
    <BladeTaskCard
        key={"BT-3Rig1"}
        duration={10}
        projectColor="red"
        taskName="BT-1"
        startDate={new Date(2023, 10, 20)}
        rig="Rig 2"
    />,
    <BladeTaskCard
        key={"BT-4Rig1"}
        duration={10}
        projectColor="red"
        taskName="BT-2"
        startDate={new Date(2023, 11, 1)}
        rig="Rig 2"
    />,
    <BladeTaskCard
        key={"BT-5Rig1"}
        duration={2}
        projectColor="green"
        taskName="BT-3"
        startDate={new Date(2023, 10, 29)}
        rig="Rig 3"
    />,
    <BladeTaskCard
        key={"BT-6Rig1"}
        duration={2}
        projectColor="green"
        taskName="BT-1"
        startDate={new Date(2023, 10, 1)}
        rig="Rig 3"
    />,
    <BladeTaskCard
        key={"BT-7Rig1"}
        duration={5}
        projectColor="green"
        taskName="BT-2"
        startDate={new Date(2023, 10, 3)}
        rig="Rig 3"
    />,
    <BladeTaskCard
        key={"BT-8Rig1"}
        duration={15}
        projectColor="brown"
        taskName="BT-1"
        startDate={new Date(2023, 10, 1)}
        rig="Rig 4"
    />,
    <BladeTaskCard
        key={"BT-9Rig1"}
        duration={15}
        projectColor="brown"
        taskName="BT-2"
        startDate={new Date(2023, 10, 16)}
        rig="Rig 5"
    />,
    <BladeTaskCard
        key={"BT-10Rig1"}
        duration={2}
        projectColor="red"
        taskName="BT-3"
        startDate={new Date(2023, 11, 11)}
        rig="Rig 5"
    />,
    <BladeTaskCard
        key={"BT-11Rig1"}
        duration={5}
        projectColor="blue"
        taskName="BT-3"
        startDate={new Date(2023, 11, 16)}
        rig="Rig 5"
    />,
    <BladeTaskCard
        key={"BT-12Rig1"}
        duration={3}
        projectColor="cyan"
        taskName="BT-1"
        startDate={new Date(2023, 11, 1)}
        rig="Rig 6"
    />,
];
export { bladeTaskCards };
