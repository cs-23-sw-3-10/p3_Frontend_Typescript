import "react-calendar-timeline/lib/Timeline.css";
import GetBladeTaskDateInfo from './scheduleQueries';
import DisplayComponent from "./Display";

function ScheduleComponent() {

    return (
        <div>
            <h1>Our Homemade Schedule</h1>
            <DisplayComponent />
        </div>
    );
}
export default ScheduleComponent;
