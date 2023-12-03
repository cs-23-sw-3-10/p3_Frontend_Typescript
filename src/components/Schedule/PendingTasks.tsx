import "./PendingTasks.css";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { useDroppable } from "@dnd-kit/core";

const projectRowHeight = 30;

interface PendingTasksProps {
    btCardsPendingHolder: BladeTaskHolder;
    numberOfRigs: number;
    transformStyle: any;
}

function PendingTasks(props: PendingTasksProps) {
    const { setNodeRef } = useDroppable({
        id: "droppablePendingTasksId",
    });

    //Array to hold names of projects with pending tasks:
    let projectsWithPendingTasks: String[] = [];

    const btCardsPending = props.btCardsPendingHolder.getBladeTasks();

    btCardsPending.forEach((card: any) => {
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
            <div style={props.transformStyle} className="pendingTasksContainer">
                <div
                    
                    ref={setNodeRef}
                    id={"pendingTasksContainerId"}
                    
                >
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
                                    }}
                                >
                                    {btCardsPending.filter((card: any) => {
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
            </div>
        </>
    );
}

export default PendingTasks;
