
type OverviewDateProps = {
    currentDate: Date;
};

function CreateOverviewDate(props: OverviewDateProps) {
    let year = props.currentDate.getFullYear();
    let monthNumber = props.currentDate.getMonth();
    let date = props.currentDate.getDate();
    let idSTR = `${year}-${monthNumber}-${date}`; // id for the date div
    return (
        <div
            key={idSTR}
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
export default CreateOverviewDate;