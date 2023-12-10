import "./PendingTasks.css";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { useDroppable } from "@dnd-kit/core"

interface PendingTasksProps {
    bladeTaskHolder: BladeTaskHolder;
    bladeTaskCards: React.ReactNode[];
    numberOfRigs: number;
    showPasswordPrompt?: boolean;
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

    //Populate proctsWithPendingTasks
    const cards = props.bladeTaskHolder.getBladeTasks().filter((card:any)=>{
        if(card){
            return card.props.rig===0
        }
        else {return true}
    });

    cards.forEach((card: any) => {
        let isInProctsWithPendingTasks = false;

        for (let i = 0; i < projectsWithPendingTasks.length; i++) {
            if (projectsWithPendingTasks[i].projectName === card.props.projectName) isInProctsWithPendingTasks = true;
        }

        if (!isInProctsWithPendingTasks) {
            projectsWithPendingTasks.push({projectName: card.props.projectName,shown: card.props.shown});
        }
    });

    //projectsWithPendingTasks.sort();

    let rowString: string = "";
    for (let i = 0; i < projectsWithPendingTasks.length; i++) {
        rowString += `[project-${projectsWithPendingTasks[i].projectName}] max-content`;
    }

    const pendingTasksStyle = {
        gridTemplateRows: rowString,
    };

    return (
        <>
            <div className="pendingTasksContainer" ref={setNodeRef}>
                <h2>Pending Blade Tasks</h2>
                <div className="pendingTasksContainerInner" style={pendingTasksStyle}>
                    {projectsWithPendingTasks.map((projectNameAndFilter) => {
                        return (
                            <div
                                key={String(projectNameAndFilter.projectName) + "pending"}
                                className="projectLegend"
                                style={{
                                    gridRow: `project-${projectNameAndFilter.projectName}`,
                                    height: "auto",
                                    whiteSpace: "nowrap",
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
                                    
                                }}
                            >
                                {cards.filter((card: any) => {
                                    if (card) {
                                        return card.props.projectName === projectNameAndFilter.projectName;
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
