import "./PopupWindow.css";

type PopupProps = {
    onClose: () => void;
    component: React.ReactComponentElement<any>;
};

function PopupWindow(props: PopupProps) {
    return (
        <div className="PopupWindow">
            <div className="PopupContent">{props.component}</div>
            <button className="PopupCloseButton" onClick={props.onClose}>
                Close
            </button>
        </div>
    );
}
export default PopupWindow;
