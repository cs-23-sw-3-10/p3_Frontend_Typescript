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
            getYear(month)
        );
    });

    let allDates: Date[] = [];
    months.forEach((month) => {
        let monthName = capitalizeFirstLetter(month.toLocaleString("default", { month: "long" }));
        for (let i = 1; i <= MonthLengths[monthName as keyof typeof MonthLengths]; i++) {
            let date = new Date(getYear(month), getMonth(month), i);
            allDates.push(date);
        }
    });
    

    const BTStyle = {
        width: `${fieldWidth}px`,
        gridTemplateColumns: createGridColumns(months),
        gridTemplateRows: "30px 30px auto",
    }

    return (
        <div className="BladeTaskFieldContainer">
            <div className="BladeTaskField" style={BTStyle}>
                {/* {createDates2(months, fieldWidth)} */}
                {months.map((month) => 
                    createMonth(month), 
                    allDates.map((date) => createDate(date)
                    )
                )}
                <div className="BTRigSpace" style={{gridColumn: "1/-1" , gridRow: "3"}}>
                {rigs.map((rig) => (
                    <div
                        className="Rig-BTField"
                        style={{ width: `${fieldWidth}px`}}
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

function createDates2(months: Date[], containerWidth: number) {
    return (
        <div className="ScheduleDateContainer" style={{ width: `${containerWidth}px`, gridColumn: "1/-1" , gridRow: "1"}}>
            {months.map((month) => createMonthDateContainer(month))}
        </div>
    );
}

function createMonthDateContainer(currentmonth: Date) {
    let year = getYear(currentmonth);
    let month = capitalizeFirstLetter(
        currentmonth.toLocaleString("default", { month: "long" })
    );
    let firstDay = new Date(
        currentmonth.getFullYear(),
        currentmonth.getMonth(),
        1
    );

    // Get the last day of the month
    let lastDay = new Date(
        currentmonth.getFullYear(),
        currentmonth.getMonth() + 1,
        0
    );

    let displayDates = [];

    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        displayDates.push(i.toString().padStart(2, "0"));
    }

    return (
        <div
            className="MonthDateContainer"
            style={{ width: `${getTotalWidth(month, year)}px`, gridColumn: "1/-1" , gridRow: "1"}}
        >
            <div
                className="month"
                style={{ width: `${getTotalWidth(month, year)}px` }}
            >
                <p>{month}</p>
            </div>

            <div
                className="datesContainer"
                style={{ width: `${getTotalWidth(month, year)}px` }}
            >
                {displayDates.map((date) => (
                    <div className="date">
                        <p>{date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function createMonth(currentmonth: Date) {
    let year = getYear(currentmonth);
    let monthNumber = getMonth(currentmonth);
    let month = capitalizeFirstLetter(
        currentmonth.toLocaleString("default", { month: "long" })
    );
    let firstDay = 1;
    // Get the last day of the month
    let lastDay = MonthLengths[month as keyof typeof MonthLengths];
    let classNameSTR = `${year}-${monthNumber}`

    return (
        <div
                className= {classNameSTR}
                style={{ width: `${getTotalWidth(month, year)}px`, gridColumn: "1", gridRow: `${firstDay}/${lastDay}`}}
            >
                <p>{month}</p>
            </div>
    );
}

function createDate(currentDate: Date) {
    let year = getYear(currentDate);
    let monthNumber = getMonth(currentDate);
    let month = capitalizeFirstLetter(
        currentDate.toLocaleString("default", { month: "long" })
    );
    let date = currentDate.getDate();
    let classNameSTR = `${year}-${monthNumber}-${date}`

    return (
        <div className={classNameSTR} style={{width: "25px", gridColumn: `${classNameSTR}`, gridRow: "2/3"}}>
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

function getYear(date: Date) {
    let year = date.getFullYear();
    return year;
}

function getMonth(date: Date) {
    let month = date.getMonth();
    return month;
}

function createGridColumns(months: Date[]) {
    let gridSTR = "";
    months.forEach((month) => {
        let newmonth = capitalizeFirstLetter(month.toLocaleString("default", { month: "long" }));
        let yearLabel = getYear(month);
        let monthLabel = getMonth(month);
        for (let i = 0; i < MonthLengths[newmonth as keyof typeof MonthLengths]; i++) {
            gridSTR += `[${yearLabel}-${monthLabel}-${i}]${dateDivLength}px `
        }
    });
    return gridSTR;
}