import "./PendingTasks.css";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { GET_BT_PENDING } from "../../api/queryList";
import { useQuery } from "@apollo/client";
import BladeTaskCard from "./BladeTaskCard";
import { DndContext } from "@dnd-kit/core";
import { handleDragStart } from "./TimelineField";
import { findBTIndex } from "./TimelineField";

interface PendingTasksProps {
    BladeTaskHolder: BladeTaskHolder;
    BladeTaskCards: React.ReactNode[];
    isDragging: boolean;
    setDragging: React.Dispatch<React.SetStateAction<boolean>>;
    filter: string;
}

function PendingTasks(props: PendingTasksProps) {
    const { loading, error, data } = useQuery(GET_BT_PENDING);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error {error.message}</p>;
    }

    let btCards: React.ReactNode[] = [];

    data["AllBladeTasksInRange"].forEach((bt: any) => {
        let btShown = false;
        if (
            bt.bladeProject.customer === props.filter ||
            props.filter === "None"
        ) {
            btShown = true;
        }

        btCards.push(
            <BladeTaskCard
                key={bt.id}
                duration={bt.duration}
                projectColor={bt.bladeProject.color}
                projectId={bt.bladeProject.id}
                customer={bt.bladeProject.customer}
                taskName={bt.taskName}
                rig={bt.testRig}
                id={bt.id}
                shown={btShown}
                disableDraggable={false}
                inConflict={false}
            />
        );
    });

    let bladeTasks = new BladeTaskHolder(btCards);

    return (
        <DndContext>
            <div className="pendingTasksContainer">Pending Tasks</div>
            onDragStart={(event) => {
                        handleDragStart(event, setDragging);
                    }}
                    onDragEnd={(event) => {
                        handleDragEndPending(event, bladeTasks, setDragging, updateBt);
                    }}
        </DndContext>
    );
}

export default PendingTasks;


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
                        startDate={new Date(overDate)}
                        endDate={newEndDate}
                        rig={overRig}
                    />
                );
                bladeTaskHolder.setBladeTasks(updatedBladeTaskCards);

            setDragging(false);
        }
    } else {
        console.log("over is null");
    }
}
