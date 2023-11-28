import "./PopupWindow.css"
import EditBTComponent from "./EditBTComponent";
import { BladeTaskCardProps } from "../Schedule/BladeTaskCard";

type PopupProps = {
    onClose: () => void;
    bladeTaskID: number; 
}

function PopupWindow(props: PopupProps){
    return(
        <div className="PopupWindow">
            <div className="PopupContent">
                <EditBTComponent bladeTaskID={props.bladeTaskID}/>
            </div>
             <button className="PopupCloseButton" onClick={props.onClose}>Close</button>
        </div>
    )
}
export default PopupWindow;