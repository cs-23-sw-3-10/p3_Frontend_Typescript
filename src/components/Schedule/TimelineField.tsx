enum MonthLengths { // Non-leap year for easy acces of number of days in a month
    Januar = 31,
    Februar = 28, // Default non-leap year
    Marts = 31,
    April = 30,
    May = 31,
    Juni = 30,
    Juli = 31,
    August = 31,
    September = 30,
    Oktober = 31,
    November = 30,
    December = 31,
}
const dateDivLength = 25; // px length of the dates in the schedule

function createTimelineField(rigs: string[], months: Date[]) {
    let fieldWidth: number = 0; // px width of the field dynamically calculated from the number of months displayed
    months.forEach((month) => {
        fieldWidth += getTotalWidth(
            capitalizeFirstLetter(
                month.toLocaleString("default", { month: "long" }) // Get the month name
            ),
            month.getFullYear()
        );
    });

    let allDates: Date[] = []; // All dates to be displayed in the schedule
    months.forEach((month) => {
        let monthName = capitalizeFirstLetter(
            month.toLocaleString("default", { month: "long" }) // Get the month name
        );
        for ( // Create a date for each day in the month
            let i = 1;
            i <= MonthLengths[monthName as keyof typeof MonthLengths];
            i++
        ) {
            let date = new Date(month.getFullYear(), month.getMonth(), i);
            allDates.push(date);
        }
    });
 
    const columnsOfSchedule = createGridColumns(allDates) // Create the grid columns for the schedule

    const BTFieldStyle = { // Style for the BladeTaskField
        width: `${fieldWidth}px`,
        gridTemplateColumns: columnsOfSchedule,
        gridTemplateRows: "30px 30px auto",
    };

    const rigFieldContainerStyle = {
        gridColumn: "1/-1", 
        gridRow: "3",
        height: rigs.length * 50 + "px", // The height of the container is the number of rigs times the height of each rig
        maxHeight: rigs.length * 50 + "px",
        minHeight: rigs.length * 50 + "px",
    }

    return (
        <div className="TimelineFieldContainer">
            <div className="TimelineField" style={BTFieldStyle}>
                {months.map((month) => createMonthDateContainer(month))}
                <div
                    className="RigFieldContainer"
                    style={rigFieldContainerStyle}
                >
                    {rigs.map((rig) =>
                        createRigFieldContainer(rig, allDates, fieldWidth, columnsOfSchedule)
                    )}
                    
                </div>
            </div>
        </div>
    );
}
export default createTimelineField;

function createMonthDateContainer(currentMonth: Date) {
    let year = currentMonth.getFullYear();
    let monthNumber = currentMonth.getMonth();
    let month = capitalizeFirstLetter(
        currentMonth.toLocaleString("default", { month: "long" })
    );
    let idSTR = `${year}-${month}Container`; // id for the container div

    let monthDates: Date[] = []; // All dates in the month

    for (
        let i = 1;
        i <= MonthLengths[month as keyof typeof MonthLengths];
        i++
    ) {
        let date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            i
        );
        monthDates.push(date);
    }
    const columnTemplate = monthDates // Create the grid columns for the month
        .map(
            (date) => // Create a labeled column for each date
                `[date-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}] ${dateDivLength}px`
        )
        .join(" "); // Join the columns into a string

    let firstDay = `date-${year}-${monthNumber}-1`; // Get the first day of the month
   
    let lastDay = `date-${year}-${monthNumber}-${ getMonthLength(month, year)}`; // Get the last day of the month

    const MonthDateContainerStyle = { // Style for the MonthDateContainer
        width: `${getTotalWidth(month, year)}px`, // Width of the container is the total width of the month
        gridTemplateColumns: columnTemplate,
        gridTemplateRow: "30px 30px",
        gridColumn: `${firstDay}/${lastDay}`, // The container spans from the first day to the last day of the month
        gridRow: "1/2",
    };

    return (
        <div className="MonthDateContainer" id={idSTR} style={MonthDateContainerStyle}>
            {createMonthHeader(currentMonth)}
            {createDatesContainer(currentMonth, monthDates, columnTemplate)}
        </div>
    );
}

function createMonthHeader(currentMonth: Date) {
    let year = currentMonth.getFullYear();
    let monthNumber = currentMonth.getMonth();
    let month = capitalizeFirstLetter(
        currentMonth.toLocaleString("default", { month: "long" }) // Get the month name
    );
    let idSTR = `${year}-${monthNumber}`; // id for the header div

    return (
        <div
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

function createDatesContainer(
    currentMonth: Date,
    monthDates: Date[],
    columnTemplate: string
) {
    let year = currentMonth.getFullYear();
    let monthNumber = currentMonth.getMonth();
    let containerID = `${year}-${monthNumber}-DateContainer`; // id for the container div

    return (
        <div
            className="DateContainer"
            id={containerID}
            style={{
                gridTemplateColumns: columnTemplate, // The container contains a column for each date
                gridTemplateRows: "30px",
            }}
        >
            {monthDates.map((date) => createDate(date)) /* Create a date for each day in the month */}
        </div>
    );
}

function createDate(currentDate: Date) {
    let year = currentDate.getFullYear();
    let monthNumber = currentDate.getMonth();
    let date = currentDate.getDate();
    let idSTR = `${year}-${monthNumber}-${date}`; // id for the date div
    return (
        <div
            className="DateElement"
            id={idSTR}
            style={{
                gridColumn: `date-${year}-${monthNumber}-${date}`, // The date is placed in the column corresponding to its date
                gridRow: "1",
            }}
        >
            <p>{date}</p>
        </div>
    );
}

function createRigFieldContainer(
    rig: string,
    allDates: Date[],
    fieldWidth: number,
    columns: string // The columns of the schedule
) {
    const rigStyle = {
        width: `${fieldWidth}px`,
        gridTemplateColumns: columns, // The righas columns corresponding to the schedule
        gridTemplateRows: "auto",
    };
    return (
        <div className="RigField" id={`id-${rig}`} style={rigStyle}>
            {allDates.map((date) => createRigFieldDates(rig, date))}
        </div>
    );
}

function createRigFieldDates(rig: string, date: Date) {
    let year = date.getFullYear();
    let monthNumber = date.getMonth();
    let dateNumber = date.getDate();
    let weekDay = date.getDay(); // 0 = Sunday, 6 = Saturday to gray out weekends
    let idSTR = `${rig}-${year}-${monthNumber}-${dateNumber}}`; // id for the date div

    let RigFieldDatesStyle = { // Style for the RigFieldDate
        gridColumn: `date-${year}-${monthNumber}-${dateNumber}`,
        gridRow: "1",
        backgroundColor: "white", // Default color
    };
    if (weekDay === 0 || weekDay === 6) {
        RigFieldDatesStyle.backgroundColor = "lightgrey"; // Gray out weekends
    }

    return (
        <div
            className="RigFieldDate"
            id={idSTR}
            style={RigFieldDatesStyle}
        ></div>
    );
}

function getTotalWidth(month: string, year: number) {
    let totalWidth = // Get the total width of the month
        dateDivLength * getMonthLength(month, year); // The total width is the number of days in the month times the width of each date
    return totalWidth;
}

function getMonthLength(month: string, year: number) {
    return month === "February" // Check if the month is February
        ? getDaysInFebruary(year) // If it is, get the number of days in February
        : MonthLengths[month as keyof typeof MonthLengths]; // Else, get the number of days in the month
}

function capitalizeFirstLetter(str: string) { 
    return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize the first letter of a string
}

function getDaysInFebruary(year: number): number {
    return isLeapYear(year) ? 29 : 28; // Return 29 if the year is a leap year, else return 28
}

function isLeapYear(year: number): boolean {
    // Leap years are divisible by 4, but not divisible by 100 unless also divisible by 400
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function createGridColumns(allDates: Date[]) {
    let gridSTR = ""; // String to be used as grid-template-columns
    allDates.forEach((date) => {// Create a labeled column for each date
        gridSTR += `[date-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}]${dateDivLength}px `; 
    });
    return gridSTR;
}
