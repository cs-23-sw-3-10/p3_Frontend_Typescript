import "./PendingTasks.css";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { GET_BT_PENDING } from "../../api/queryList";
import { useQuery } from "@apollo/client";
import BladeTaskCard from "./BladeTaskCard";
import { DndContext } from "@dnd-kit/core";
import { handleDragStart } from "./TimelineField";
import { findBTIndex } from "./TimelineField";
import { useDroppable } from "@dnd-kit/core";

interface PendingTasksProps {
    bladeTaskHolder: BladeTaskHolder;
    bladeTaskCards: React.ReactNode[];
}

function PendingTasks(props: PendingTasksProps) {
    const { setNodeRef } = useDroppable({
        id: "droppablePendingTasksId",
    });

    console.log("props.bladeTaskCards :", props.bladeTaskCards)

    return <div className="pendingTasksContainer">{props.bladeTaskCards}</div>;
}

export default PendingTasks;

/*
function handleDragEndPending(
    event: any,
    bladeTaskHolder: BladeTaskHolder,
    setDragging: React.Dispatch<React.SetStateAction<boolean>>,
    updateBT: Function
    
) {
    
    console.log("drag ended over pending container");
    
    const { active, over } = event;
    console.log(active);
    if (over !== null) {

 
        const indexBT = findBTIndex(bladeTaskHolder.getBladeTasks(),active);

        if (indexBT !== -1) {
            const updatedBladeTaskCards = bladeTaskHolder.getBladeTasks();
            const draggedCard = updatedBladeTaskCards[
                indexBT
            ] as React.ReactElement;

                updateBT({
                    variables:{
                        id:draggedCard.props.id,
                        startDate: null,
                        endDate: null,
                        duration:draggedCard.props.duration,
                        rig:null
                    }
                })

                updatedBladeTaskCards[indexBT] = (
                    <BladeTaskCard
                        key={draggedCard.key}
                        id={draggedCard.props.id}
                        duration={draggedCard.props.duration}
                        projectColor={draggedCard.props.projectColor}
                        projectId={draggedCard.props.projectId}
                        customer={draggedCard.props.customer}
                        taskName={draggedCard.props.taskName}
                        startDate={undefined}
                        endDate={undefined}
                        rig={undefined}
                    />
                );
                bladeTaskHolder.setBladeTasks(updatedBladeTaskCards);

            setDragging(false);
        }
    } else {
        console.log("over is null");
    }
}
*/
