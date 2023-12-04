import "./PendingTasks.css";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { useDroppable } from "@dnd-kit/core";

const projectRowHeight = 30;

interface PendingTasksProps {
    btCardsPendingHolder: BladeTaskHolder;
    numberOfRigs: number;
    transformStyle: any;
}

type projectNameAndFilterInfo={
    projectName: string;
    shown: boolean
}

function PendingTasks(props: PendingTasksProps) {
    const { setNodeRef } = useDroppable({
        id: "droppablePendingTasksId",
    });

    //Array to hold names of projects with pending tasks:
    let projectsWithPendingTasks: projectNameAndFilterInfo[] = [];

    const btCardsPending = props.btCardsPendingHolder.getBladeTasks();

    btCardsPending.forEach((card: any) => {
        let isInProjectsWithPendingTasks = false;

        for (let i = 0; i < projectsWithPendingTasks.length; i++) {
            if (projectsWithPendingTasks[i].projectName === card.props.projectName)
                isInProjectsWithPendingTasks = true;
        }

        if (!isInProjectsWithPendingTasks) {
            projectsWithPendingTasks.push({projectName: card.props.projectName,shown: card.props.shown});
        }
    });

    let rowString: string = "";
    for (let i = 0; i < projectsWithPendingTasks.length; i++) {
        rowString += `[project-${projectsWithPendingTasks[i].projectName}] auto`;
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
                    <h1>Pending Blade Tasks</h1>
                    <div
                        className="pendingTasksContainerInner"
                        style={pendingTasksStyle}
                    >
                        {projectsWithPendingTasks.map((projectNameAndFilter) => {
                            return (
                                <div
                                    key={String(projectNameAndFilter.projectName) + "pending"}
                                    className="projectLegend"
                                    style={{
                                        gridRow: `project-${projectNameAndFilter.projectName}`,
                                        height: `${projectRowHeight}px`,
                                        maxHeight: `${projectRowHeight}px`,
                                    }}
                                >
                                    {projectNameAndFilter.shown &&projectNameAndFilter.projectName}
                                    {!projectNameAndFilter.shown && "Hidden BP"}
                                </div>
                            );
                        })}

                        {projectsWithPendingTasks.map((projectNameAndFilter: any) => {
                            return (
                                <div
                                    key={`${projectNameAndFilter.projectName}-pending-list`}
                                    className="pendingTasksColumn"
                                    style={{
                                        gridRow: `project-${projectNameAndFilter.projectName}`,
                                        height: `${projectRowHeight}px`,
                                        maxHeight: `${projectRowHeight}px`,
                                    }}
                                >
                                    {btCardsPending.filter((card: any) => {
                                        if (card) {
                                            return (
                                                card.props.projectName ===
                                                projectNameAndFilter.projectName
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
