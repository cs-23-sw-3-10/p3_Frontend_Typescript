import "./PendingTasks.css";
import { BladeTaskHolder } from "./BladeTaskHolder";
import { useDroppable } from "@dnd-kit/core";
import { rigFieldHeight } from "./RigFieldContainer";
import { monthHeaderHeight } from "./MonthHeader";
import { dateElementHeight } from "./OverviewDate";
import { passwordPromptHeight } from "./ScheduleComponent";

const projectRowHeight=30;

interface PendingTasksProps {
    bladeTaskHolder: BladeTaskHolder;
    bladeTaskCards: React.ReactNode[];
    numberOfRigs: number
    showPasswordPrompt?: boolean
}

function PendingTasks(props: PendingTasksProps) {
    const { setNodeRef } = useDroppable({
        id: "droppablePendingTasksId",
    });

    //Array to hold names of projects with pending tasks:
    let projectsWithPendingTasks: String[] = [];

    //Populate proctsWithPendingTasks
    const cards = props.bladeTaskHolder.getBladeTasks();

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

    let containerOffSetFromTop=70+monthHeaderHeight+dateElementHeight+props.numberOfRigs*rigFieldHeight;

    let whiteSpaceHeight=40+projectsWithPendingTasks.length*projectRowHeight;
    if(props.showPasswordPrompt){
        containerOffSetFromTop+=passwordPromptHeight;
    }

    return (
        <>
            <div className="whiteSpace" style={{height: `${whiteSpaceHeight}px`}}>


            </div>
            <div className="pendingTasksContainer" style={{top: `${containerOffSetFromTop}px`}}ref={setNodeRef}>
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
                                className="pendingTasksColumn"
                                style={{
                                    gridRow: `project-${projectName}`,
                                    height: `${projectRowHeight}px`,
                                    maxHeight: `${projectRowHeight}px`,
                                }}
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
