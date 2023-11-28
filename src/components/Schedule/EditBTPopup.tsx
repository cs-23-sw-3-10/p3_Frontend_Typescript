type EditBTPopupProps = {
    onClose: () => void;
}

function EditBTPopup(props: EditBTPopupProps){
    return(
        <div className="EditBTPopup">
            <div className="EditBTPopupContent">
            <h1>Edit BT Popup</h1>
            </div>
             <button className="EditBTPopupCloseButton" onClick={props.onClose}>Close</button>
        </div>
    )
}
export default EditBTPopup;