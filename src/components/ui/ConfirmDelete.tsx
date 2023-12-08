import "./ConfirmDelete.css";

interface ConfirmDeleteProps {
    delete: Function;
    close: Function;
    Id: number;
}

function ConfirmDelete(props: ConfirmDeleteProps) {
    return (
        <div className="confirm-delete">
            <p>Are you sure you want to delete this?</p>
            <div className="confirmButtonContainer">
                <button
                    className="ConfirmDeleteButton"
                    onClick={() => {
                        props.delete(props.Id, true);
                        props.close();
                    }}
                >
                    Confirm
                </button>
                <button className="CancelDeleteButton" onClick={() => props.close()}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
export default ConfirmDelete;
