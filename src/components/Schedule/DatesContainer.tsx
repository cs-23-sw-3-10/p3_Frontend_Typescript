import CreateOverviewDate from "./OverviewDate";

type DatesContainerProps = {
    currentMonth: Date;
    monthDates: Date[];
    columnTemplate: string;
};

function CreateDatesContainer(props: DatesContainerProps) {
    let year = props.currentMonth.getFullYear();
    let monthNumber = props.currentMonth.getMonth();
    let containerID = `${year}-${monthNumber}-DateContainer`; // id for the container div

    return (
        <div
            key={containerID}
            className="DateContainer"
            id={containerID}
            style={{
                gridTemplateColumns: props.columnTemplate, // The container contains a column for each date
                gridTemplateRows: "30px",
            }}
        >
            {
                props.monthDates.map((date) => (
                    <CreateOverviewDate
                        key={getDateKey(date)}
                        currentDate={date}
                    />
                )) /* Create a date for each day in the month */
            }
        </div>
    );
}
export default CreateDatesContainer;

function getDateKey(date: Date) { // Get the key for a date
    return `date-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
