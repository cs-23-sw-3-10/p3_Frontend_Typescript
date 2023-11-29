export const dateElementHeight=30

type OverviewDateProps = {
    currentDate: Date;
};

function CreateOverviewDate(props: OverviewDateProps) {
    let year = props.currentDate.getFullYear();
    let monthNumber = props.currentDate.getMonth();
    let date = props.currentDate.getDate();
    let idSTR = `${year}-${monthNumber}-${date}`; // id for the date div

    let todayDate = new Date(Date.now());
    const todayColour = "rgba(50, 128, 128, 0.6)";
    let todayDateSTR = `${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate()}`;
    // marking the current date with a different colour
    const colour = idSTR === todayDateSTR ? todayColour : "white"; 

    return (
        <div
            key={idSTR}
            className="DateElement"
            id={idSTR}
            style={{
                backgroundColor: colour,
                gridColumn: `date-${year}-${monthNumber}-${date}`, // The date is placed in the column corresponding to its date
                gridRow: "1",
                height: `${dateElementHeight}px`,
                maxHeight: `${dateElementHeight}px`
            }}
        >
            <p>{date}</p>
        </div>
    );
}
export default CreateOverviewDate;
