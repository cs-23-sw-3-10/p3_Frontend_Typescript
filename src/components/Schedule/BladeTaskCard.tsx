import "./BladeTaskCard.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

//interface used to define the types of the props of BladeTaskCard
interface BladeTaskCardProps {
    startDate: Date;
    endDate: Date;
    duration: number;
    attachPeriod?: number;
    detachPeriod?: number;
    rig?: number;
    projectColor: string;
    taskName: string;
    id: number;
}
interface BladeTaskDraggableProps {
    style: any;
    id: number;
    taskName: string;
}

function BladeTaskCard(props: BladeTaskCardProps) {
    //Dynamic styling based on props values
    const cardStyle = {
        backgroundColor: props.projectColor,
        gridColumn: `date-${props.startDate.getFullYear()}-${props.startDate.getMonth()}-${props.startDate.getDate()} / 
        date-${props.endDate.getFullYear()}-${props.endDate.getMonth()}-${props.endDate.getDate()+1}`,
    };

    const droppableProps: BladeTaskDraggableProps = {
        style: cardStyle,
        id: props.id,
        taskName: props.taskName,
    };

    return <DraggableBladeTask {...droppableProps} />;
}
export default BladeTaskCard;

function DraggableBladeTask(props: BladeTaskDraggableProps) {
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
            id={`${props.id}`}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            <div>{props.taskName}</div>
        </div>
    );
}
