import { type } from "os";
import { capitalizeFirstLetter } from "./TimelineField";

type MonthHeaderProps = {
    currentMonth: Date;
};

function CreateMonthHeader(props: MonthHeaderProps) {
    let year = props.currentMonth.getFullYear();
    let monthNumber = props.currentMonth.getMonth();
    let month = capitalizeFirstLetter(
        props.currentMonth.toLocaleString("default", { month: "long" }) // Get the month name
    );
    let idSTR = `${year}-${monthNumber}`; // id for the header div

    return (
        <div
            key={idSTR}
            className="MonthHeader"
            id={idSTR}
            style={{
                gridColumn: `1/-1`, // The header spans from the first day to the last day of the month
                gridRow: "1",
            }}
        >
            <p>{`${month}(${year})`}</p>
        </div>
    );
}
export default CreateMonthHeader;
