import { useState } from "react";
import BladeTaskMenu from "../CreateBTMenu/BladeTaskMenu";
import StyledButton from "../ui/styledButton";
import BladeProjectMenu from "../CreateBPMenu/BPMenu";
import ReplaceWarning from "../ui/ReplaceWarning";
import "./AdditionalContent.css";

function CreateAdditionalContent(){
    const [creationMenu, setCreationMenu] = useState("");

    const handleCreateProjectClick=()=>{
        if(creationMenu !== "createProject"){
            setCreationMenu("createProject")
        }else setCreationMenu("");
    }

    const handleCreateTaskClick=()=>{
        if(creationMenu !== "createTask"){
            setCreationMenu("createTask")
        }else setCreationMenu("");
    }

    const handleReplaceScheduleClick=()=>{
        if(creationMenu !== "replaceSchedule"){
            setCreationMenu("replaceSchedule")
        }else setCreationMenu("");
    }

    const handleDiscardChangesClick=()=>{
        if(creationMenu !== "discardChanges"){
            setCreationMenu("discardChanges")
        }else setCreationMenu("");
    }


    return(
        <div className="AdditionalContent">
            <div className="buttonContainer">
                <div>
                <button className="submit-button" 
                    style={{ marginRight: "10px", marginLeft: "10px" 
                }}
                    onClick={handleCreateProjectClick}
                >
                    Create Blade Project
                </button>
                <button className="submit-button" 
                 onClick={handleCreateTaskClick}>
                    Create Blade Task
                </button>
                </div>

                <div>
                <button
                className="delete-button" 
                onClick={handleReplaceScheduleClick}>
                    Replace active schedule
                </button>
                <button 
                    className="delete-button" 
                    style={{ marginRight: "10px", marginLeft: "10px" 
                }}
                    onClick={handleDiscardChangesClick}>
                    Discard changes
                </button>
                </div>
            </div>
            {creationMenu === "createTask" && <BladeTaskMenu creator={true}/>}
            {creationMenu ==="createProject" && <BladeProjectMenu creator={true}/>}
            {creationMenu === "replaceSchedule" && <ReplaceWarning openstate={setCreationMenu} mode={"replaceSchedule"}/>}
            {creationMenu === "discardChanges" &&  <ReplaceWarning openstate={setCreationMenu} mode={"discardChanges"}/>}
        </div>
    );
}

export default CreateAdditionalContent;
