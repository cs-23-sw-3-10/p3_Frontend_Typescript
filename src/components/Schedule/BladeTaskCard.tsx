import "./BladeTaskCard.css";

//interface used to define the types of the props of BladeTaskCard
interface BladeTaskCardProps {
    startDate: Date;
    duration: number; 
    attachPeriod?: number;
    detachPeriod?:number; 
    rig?: string; 
    projectColor: string;
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

    return (
        <div className="bladeTaskCard" style={cardStyle}>
            <div>{props.taskName}</div>
        </div>
    );
}

let bladeTaskCards = [
    <BladeTaskCard
        duration={5}
        projectColor="blue"
        taskName="BT-1"
        startDate={new Date(2023, 8, 1)}
        rig="Rig 1"
    />,
    <BladeTaskCard
        duration={40}
        projectColor="blue"
        taskName="BT-2"
        startDate={new Date(2023, 8, 6)}
        rig="Rig 1"
    />,
    <BladeTaskCard
        duration={10}
        projectColor="red"
        taskName="BT-1"
        startDate={new Date(2023, 8, 20)}
        rig="Rig 2"
    />,
    <BladeTaskCard
        duration={10}
        projectColor="red"
        taskName="BT-2"
        startDate={new Date(2023, 9, 1)}
        rig="Rig 2"
    />,
    <BladeTaskCard
        duration={2}
        projectColor="green"
        taskName="BT-3"
        startDate={new Date(2023, 8, 29)}
        rig="Rig 3"
    />,
    <BladeTaskCard
        duration={2}
        projectColor="green"
        taskName="BT-1"
        startDate={new Date(2023, 8, 1)}
        rig="Rig 3"
    />,
    <BladeTaskCard
        duration={5}
        projectColor="green"
        taskName="BT-2"
        startDate={new Date(2023, 8, 3)}
        rig="Rig 3"
    />,
    <BladeTaskCard
        duration={15}
        projectColor="brown"
        taskName="BT-1"
        startDate={new Date(2023, 8, 1)}
        rig="Rig 4"
    />,
    <BladeTaskCard
        duration={15}
        projectColor="brown"
        taskName="BT-2"
        startDate={new Date(2023, 8, 16)}
        rig="Rig 5"
    />,
    <BladeTaskCard
        duration={2}
        projectColor="red"
        taskName="BT-3"
        startDate={new Date(2023, 9, 11)}
        rig="Rig 5"
    />,
    <BladeTaskCard
        duration={5}
        projectColor="blue"
        taskName="BT-3"
        startDate={new Date(2023, 9, 16)}
        rig="Rig 5"
    />,
    <BladeTaskCard
        duration={3}
        projectColor="cyan"
        taskName="BT-1"
        startDate={new Date(2023, 9, 1)}
        rig="Rig 6"
    />,
];

export { bladeTaskCards };
