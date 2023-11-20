import CreateMonthHeader from "./MonthHeader";
import CreateDatesContainer from "./DatesContainer";
import {
    capitalizeFirstLetter,
    getMonthLength,
    getTotalWidth,
    dateDivLength,
} from "./TimelineField";

type MonthDateContainerProps = {
    currentMonth: Date;
};

function CreateMonthDateContainer(props: MonthDateContainerProps) {
    let year = props.currentMonth.getFullYear();
    let monthNumber = props.currentMonth.getMonth();
    let month = capitalizeFirstLetter(
        props.currentMonth.toLocaleString("default", { month: "long" })
    );
    let idSTR = `${year}-${month}Container`; // id for the container div

    let monthDates: Date[] = []; // All dates in the month

    for (
        let i = 1;
        i <= getMonthLength(month, year);
        i++
    ) {
        let date = new Date(
            props.currentMonth.getFullYear(),
            props.currentMonth.getMonth(),
            i
        );
        monthDates.push(date);
    }
    if (month === "Februar") {
        console.log(monthDates.length);
    }

    const columnTemplate = monthDates // Create the grid columns for the month
        .map(
            (
                date // Create a labeled column for each date
            ) =>
                `[date-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}] ${dateDivLength}px`
        )
        .join(" "); // Join the columns into a string
        if (month === "Februar") {
            console.log(columnTemplate);
        }

    let firstDay = `date-${year}-${monthNumber}-1`; // Get the first day of the month

    let lastDay = `date-${year}-${monthNumber}-${getMonthLength(month, year)}`; // Get the last day of the month

    const MonthDateContainerStyle = {
        // Style for the MonthDateContainer
        width: `${getTotalWidth(month, year)}px`, // Width of the container is the total width of the month
        gridTemplateColumns: columnTemplate,
        gridTemplateRow: "30px 30px",
        gridColumn: `${firstDay}/${lastDay}`, // The container spans from the first day to the last day of the month
        gridRow: "1/2",
    };

    return (
        <div
            key={idSTR}
            className="MonthDateContainer"
            id={idSTR}
            style={MonthDateContainerStyle}
        >
            <CreateMonthHeader currentMonth={props.currentMonth} />
            <CreateDatesContainer
                currentMonth={props.currentMonth}
                monthDates={monthDates}
                columnTemplate={columnTemplate}
            />
        </div>
    );
}
export default CreateMonthDateContainer;
