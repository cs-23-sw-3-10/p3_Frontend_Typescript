import { create } from "domain";
import { get } from "http";

enum MonthLengths {
    January = 31,
    February = 28, // Default non-leap year
    March = 31,
    April = 30,
    May = 31,
    June = 30,
    July = 31,
    August = 31,
    September = 30,
    October = 31,
    November = 30,
    December = 31,
}
const dateDivLength = 25;

function createBladeTaskField(rigs: string[], months: Date[]) {
    let fieldWidth = 0;
    months.forEach((month) => {
        fieldWidth += getTotalWidth(
            month.toLocaleString("default", { month: "long" }),
            month.getFullYear()
        );
    });

    let allDates: Date[] = [];
    months.forEach((month) => {
        let monthName = capitalizeFirstLetter(
            month.toLocaleString("default", { month: "long" })
        );
        for (
            let i = 1;
            i <= MonthLengths[monthName as keyof typeof MonthLengths];
            i++
        ) {
            let date = new Date(month.getFullYear(), month.getMonth(), i);
            allDates.push(date);
        }
    });

    const BTStyle = {
        width: `${fieldWidth}px`,
        gridTemplateColumns: createGridColumns(months),
        gridTemplateRows: "30px 30px auto",
    };

    return (
        <div className="BladeTaskFieldContainer">
            <div className="BladeTaskField" style={BTStyle}>
                {/* {createDates2(months, fieldWidth)} */}
                {months.map((month) => createMonthDateContainer(month))}
                <div
                    className="BTRigContainer"
                    style={{ gridColumn: "1/-1", gridRow: "3" }}
                >
                    {rigs.map((rig) => (
                        <div
                            className="Rig-BTField"
                            style={{ width: `${fieldWidth}px` }}
                        >
                            <h4>{rig}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default createBladeTaskField;

function createMonthDateContainer(currentMonth: Date) {
    let year = currentMonth.getFullYear();
    let monthNumber = currentMonth.getMonth();
    let month = capitalizeFirstLetter(
        currentMonth.toLocaleString("default", { month: "long" })
    );
    let classNameSTR = `${year}-${month}Container`;

    let monthDates: Date[] = [];

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
    const columnTemplate = monthDates.map((date) => `[${date.getFullYear()}-${date.getMonth()}-${date.getDate()}] ${dateDivLength}px`).join(' ');

    let firstDay = `${year}-${monthNumber}-1`;
    // Get the last day of the month
    let lastDay = `${year}-${monthNumber}-${
        MonthLengths[month as keyof typeof MonthLengths]
    }`;

    const MDStyle = {
        width: `${getTotalWidth(month, year)}px`,
        gridTemplateColumns: columnTemplate,
        gridTemplateRow: "30px 30px",
        gridColumn: `${firstDay}/${lastDay}`,
        gridRow: "1/2",
    };
    console.log("MDStyle: " +columnTemplate);

    return (
        <div className="MonthDateContainer" id={classNameSTR} style={MDStyle}>
            {createMonth(currentMonth)}
            {createDates(currentMonth, monthDates, columnTemplate)}
        </div>
    );
}

function createMonth(currentMonth: Date) {
    let year = currentMonth.getFullYear();
    let monthNumber = currentMonth.getMonth();
    let month = capitalizeFirstLetter(
        currentMonth.toLocaleString("default", { month: "long" })
    );
    let idSTR = `${year}-${monthNumber}`;

    return (
        <div
            className="MonthHeader"
            id={idSTR}
            style={{
                width: `${getTotalWidth(month, year)}px`,
                gridColumn: `1/-1`,
                gridRow: "1",
            }}
        >
            <p>{month}</p>
        </div>
    );
}

function createDates(
    currentMonth: Date,
    monthDates: Date[],
    columnTemplate: string
) {
    let year = currentMonth.getFullYear();
    let monthNumber = currentMonth.getMonth();
    let containerID = `${year}-${monthNumber}Container`;
    console.log("createDate " +columnTemplate);

    return (
        <div
            className="DateContainer"
            id={containerID}
            style={{
                gridTemplateColumns: columnTemplate,
                gridTemplateRows: "30px",
            }}
        >
            {monthDates.map((date) => createDate(date))}
        </div>
    );
}

function createDate(currentDate: Date) {
    let year = currentDate.getFullYear();
    let monthNumber = currentDate.getMonth();
    let date = currentDate.getDate();
    let idSTR = `${year}-${monthNumber}-${date}`;
    return (
        <div
            className="DateElement"
            id={idSTR}
            style={{
                width: "100%",
                gridColumn: `${year}-${monthNumber}-${date}`,
            }}
        >
            <p>{date}</p>
        </div>
    );
}

function getTotalWidth(month: string, year: number) {
    let totalWidth =
        dateDivLength *
        (month === "February"
            ? getDaysInFebruary(year)
            : MonthLengths[month as keyof typeof MonthLengths]);
    return totalWidth;
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDaysInFebruary(year: number): number {
    return isLeapYear(year) ? 29 : 28;
}

function isLeapYear(year: number): boolean {
    // Leap years are divisible by 4, but not divisible by 100 unless also divisible by 400
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function createGridColumns(months: Date[]) {
    let gridSTR = "";
    months.forEach((month) => {
        let newmonth = capitalizeFirstLetter(
            month.toLocaleString("default", { month: "long" })
        );
        let yearLabel = month.getFullYear();
        let monthLabel = month.getMonth();
        for (
            let i = 0;
            i < MonthLengths[newmonth as keyof typeof MonthLengths];
            i++
        ) {
            gridSTR += `[${yearLabel}-${monthLabel}-${i}]${dateDivLength}px `;
        }
    });
    return gridSTR;
}
