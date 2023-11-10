let dato = new Date(Date.now());

enum MonthWidths {
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

function createBladeTaskField(rigs: string[]) {
    return (
        <div className="BladeTaskField">
            {createDates(dato)}
            {rigs.map((rig) => (
                <div className="Rig-BTField">
                    <h4>{rig}</h4>
                </div>
            ))}
        </div>
    );
}
export default createBladeTaskField;

function createDates(startDate: Date) {
    let year = startDate.getFullYear();
    let month = capitalizeFirstLetter(
        startDate.toLocaleString("default", { month: "long" })
    );

    // Get the first day of the month
    let firstDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

    // Get the last day of the month
    let lastDay = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0
    );

    let displayDates = [];

    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        displayDates.push(i.toString().padStart(2, "0"));
    }
    const dateDivLength = 25;
    const totalWidth =
        dateDivLength *
        (month === "February"
            ? getDaysInFebruary(year)
            : MonthWidths[month as keyof typeof MonthWidths]);
    console.log("her er width" + totalWidth);
    return (
        <div className="ScheduleDateContainer">
            <div
                className="MonthDateContainer"
                style={{ width: `${totalWidth}px` }}>
                <div className="month" style={{ width: `${totalWidth}px` }}>
                    <p>{month}</p>
                </div>

                <div
                    className="datesContainer" style={{ width: `${totalWidth}px` }}>
                    {displayDates.map((date) => (
                        <div className="date">
                            <p>{date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
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
