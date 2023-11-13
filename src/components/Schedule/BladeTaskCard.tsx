import { ReactNode } from "react";
import "./bladeTaskCard.css";

interface BladeTaskCardProps {
    duration: number;
    projectColor: string;
    taskName: string;
    startDate: Date;
    testRig: string;
}

function BladeTaskCard(props: BladeTaskCardProps) {
    const cardStyle = {
        backgroundColor: props.projectColor,
        gridColumn: `${props.startDate} / span ${props.duration}`,
    };

    return (
        <div className="bladeTaskCard" style={cardStyle}>
            <p>{props.taskName}</p>
        </div>
    );
}

function insertBladeTaskCards(BladeTaskCards: React.ReactElement<typeof BladeTaskCard>[] ) {
    BladeTaskCards.map((BladeTaskCard) => {
        console.log(BladeTaskCard);
    });
}

let bladeTaskCards=[
    <BladeTaskCard duration={10} projectColor="blue" taskName="BT-1" startDate={new Date(2023,9,1) } testRig="Rig 1"/>,
    <BladeTaskCard duration={10} projectColor="blue" taskName="BT-2" startDate={new Date(2023,9,16)}  testRig="Rig 1"/>,
    <BladeTaskCard duration={10} projectColor="red" taskName="BT-1" startDate={new Date(2023,9,1)} testRig="Rig 2"/>,
    <BladeTaskCard duration={10} projectColor="red" taskName="BT-2" startDate={new Date(2023,9,12)} testRig="Rig 2"/>,
    <BladeTaskCard duration={2} projectColor="green" taskName="BT-1" startDate={new Date(2023,9,1)} testRig="Rig 3"/>,
    <BladeTaskCard duration={5} projectColor="green" taskName="BT-2" startDate={new Date(2023,9,15)} testRig="Rig 3"/>,
    <BladeTaskCard duration={15} projectColor="brown" taskName="BT-1" startDate={new Date(2023,9,12)} testRig="Rig 4"/>,
    <BladeTaskCard duration={15} projectColor="brown" taskName="BT-2" startDate={new Date(2023,9,17)} testRig="Rig 5"/>,
    <BladeTaskCard duration={2} projectColor="red" taskName="BT-3" startDate={new Date(2023,9,1)} testRig="Rig 5"/>,
    <BladeTaskCard duration={5} projectColor="blue" taskName="BT-3" startDate={new Date(2023,9,12)} testRig="Rig 5"/>,
    <BladeTaskCard duration={3} projectColor="cyan" taskName="BT-1" startDate={new Date(2023,9,25)} testRig="Rig 6"/>,
    ]
    

    export { bladeTaskCards, insertBladeTaskCards };

