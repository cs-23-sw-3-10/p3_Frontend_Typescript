import "./PendingTasks.css";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { useQuery } from "@apollo/client";
import BladeTaskCard from "./BladeTaskCard";
import BladeTaskCardProps from "./BladeTaskCard";
import { DndContext } from "@dnd-kit/core";
import { handleDragStart } from "./TimelineField";
import { findBTIndex } from "./TimelineField";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";

interface PendingTasksProps {
    bladeTaskHolder: BladeTaskHolder;
    bladeTaskCards: React.ReactNode[];
}

function PendingTasks(props: PendingTasksProps) {
    const { setNodeRef } = useDroppable({
        id: "droppablePendingTasksId",
    });


    //Array to hold names of projects with pending tasks:
    let projectsWithPendingTasks: String[] = [];

    //Populate proctsWithPendingTasks
    const cards = props.bladeTaskHolder.getBladeTasks();
    console.log("cards :", cards);

    cards.forEach((card: any) => {
        let isInProctsWithPendingTasks = false;

        for (let i = 0; i < projectsWithPendingTasks.length; i++) {
            if (projectsWithPendingTasks[i] === card.props.projectName)
                isInProctsWithPendingTasks = true;
        }

        if (!isInProctsWithPendingTasks) {
            projectsWithPendingTasks.push(card.props.projectName);
        }
    });


    let rowString: string = "";
    for (let i = 0; i < projectsWithPendingTasks.length; i++) {
        rowString += `[project-${projectsWithPendingTasks[i]}] auto`;
    }

    const pendingTasksStyle = {
        gridTemplateRows: rowString,
    };

    return (
        <>
            <div className="whiteSpace"></div>
            <div className="pendingTasksContainer" ref={setNodeRef}>
                <h2>Pending Blade Tasks</h2>
                <div
                    className="pendingTasksContainerInner"
                    style={pendingTasksStyle}
                >
                    {projectsWithPendingTasks.map((projectName) => {
                        return (
                            <div
                                key={String(projectName)+"pending"}
                                className="projectLegend"
                                style={{ gridRow: `project-${projectName}` }}
                            >
                                
                                {projectName}
                            </div>
                        );
                    })}

                    {
                        projectsWithPendingTasks.map( (projectName: any)=>{
                            return(
                                <div className="pendingTasksColumn" style={{gridRow: `project-${projectName}`}}>
                                    {props.bladeTaskCards.filter((card: any)=>{
                                        if(card){
                                            return (card.props.projectName===projectName)
                                        }else{
                                            return false
                                        }
                                        
                                    })}
                                </div>

                            )
                        }

                        )

                    }



                </div>
            </div>
            ;
        </>
    );
}

export default PendingTasks;


