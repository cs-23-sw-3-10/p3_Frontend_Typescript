import Timeline from "react-calendar-timeline";
import moment from "moment";
import "react-calendar-timeline/lib/Timeline.css";
import GetBTDateInfo from './scheduleQueries';


interface RigInfo {
    id: string;
    title: string;
    stackItems: boolean;
    height: number;
}

interface BladeTaskInfo {
    id: string;
    group: number;
    title: string;
    start_time: moment.Moment;
    end_time: moment.Moment;
    canMove: boolean;
    canResize: boolean;
    canChangeGroup: boolean;
    dragSnap: any;
    resizeSnap: any;
    stackItems: boolean;
}

function ScheduleComponent() {
    //getting the rigs from the database
    let testRigs: RigInfo[] = []; // et kald til databasen for at hente alle rigs
    // testRigs.forEach((element: { id: string; title: string; }) => {
    //   testRigs.push({ id: element.id, title: element.title, stackItems: false, height: 30 });
    // });

    //getting the bladetasks from the database
    let bladeTasksArray: BladeTaskInfo[] = []; // et kald til databasen for at hente alle bladetasks
    // bladeTasksArray.forEach((element: { id: string; group: number; title: string; start_time: any; end_time: any;}) => {
    //   bladeTasks.push({
    //     id: element.id,
    //     group: element.group,
    //     title: element.title,
    //     start_time: moment(element.start_time),
    //     end_time: moment(element.end_time),
    //     canMove: true,
    //     canResize: true,
    //     canChangeGroup: true,
    //     dragSnap: null,
    //     resizeSnap: null,
    //     stackItems: false,
    //   });
    // });

    let x: BladeTaskInfo = {
        id: "1",
        group: 1,
        title: "den nye",
        start_time: moment().year(2023).month(10).date(1),
        end_time: moment().year(2023).month(10).date(6),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
        dragSnap: null,
        resizeSnap: null,
        stackItems: false,
    };

    let y: RigInfo = {
        id: "1",
        title: "rig 1",
        stackItems: false,
        height: 30,
    };

    const testRigsPrøve = [
        y,
        { id: "2", title: "rig 2", stackItems: false, height: 30 },
        { id: "3", title: "rig 3", stackItems: false, height: 30 },
        { id: "4", title: "rig 4", stackItems: false, height: 30 },
        { id: "5", title: "rig 5", stackItems: false, height: 30 },
        { id: "6", title: "rig 6", stackItems: false, height: 30 },
    ];

    const bladeTasksPrøve = [x];

    return (
        <div>
            <h1>Scrollable Horizontal Schedule</h1>
            <Timeline
                groups={testRigsPrøve}
                items={bladeTasksPrøve}
                minZoom={60 * 60 * 24 * 14 * 1000} // 14 days is the smallest zoom
                defaultTimeStart={moment()} // the timeline will start today
                defaultTimeEnd={moment().add(50, "days")} // and will end 30 days from today
                
                timeSteps={{
                    // zooming will be at these intervals
                    second: 0,
                    minute: 0,
                    hour: 0,
                    day: 1,
                    month: 1,
                    year: 1,
                }}
            />
        </div>
    );
}
export default ScheduleComponent;
