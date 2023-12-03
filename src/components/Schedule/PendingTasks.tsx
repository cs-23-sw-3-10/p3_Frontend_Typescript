import "./PendingTasks.css";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";

const projectRowHeight=30;

interface PendingTasksProps {
    cardHolder: BladeTaskHolder;
    bladeTaskCards: React.ReactNode[];
    numberOfRigs: number
    showPasswordPrompt?: boolean
}

function PendingTasks(props: PendingTasksProps) {
    const { setNodeRef } = useDroppable({
        id: "droppablePendingTasksId",
    });

    const [btCardsPending, setBtCardsPending] = useState<React.ReactNode[]>(
        props.bladeTaskCards
    );

    //Array to hold names of projects with pending tasks:
    let projectsWithPendingTasks: String[] = [];


    btCardsPending.forEach((card: any) => {

        console.log("card :",card.props.projectName)

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
            <div className="pendingTasksContainer" ref={setNodeRef}>
                <h2>Pending Blade Tasks</h2>
                <div
                    className="pendingTasksContainerInner"
                    style={pendingTasksStyle}
                >
                    {projectsWithPendingTasks.map((projectName) => {
                        return (
                            <div
                                key={String(projectName) + "pending"}
                                className="projectLegend"
                                style={{
                                    gridRow: `project-${projectName}`,
                                    height: `${projectRowHeight}px`,
                                    maxHeight: `${projectRowHeight}px`,
                                }}
                            >
                                {projectName}
                            </div>
                        );
                    })}

                    {projectsWithPendingTasks.map((projectName: any) => {
                        return (
                            <div
                                key={`${projectName}-pending-list`}
                                className="pendingTasksColumn"
                                style={{
                                    gridRow: `project-${projectName}`,
                                    height: `${projectRowHeight}px`,
                                    maxHeight: `${projectRowHeight}px`,
                                }
                            }
                            >
                                {props.bladeTaskCards.filter((card: any) => {
                                    if (card) {
                                        return (
                                            card.props.projectName ===
                                            projectName
                                        );
                                    } else {
                                        return false;
                                    }
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default PendingTasks;
