import { useState } from "react";
import BladeTaskMenu from "../CreateBTMenu/BladeTaskMenu";
import StyledButton from "../ui/styledButton";
import BladeProjectMenu from "../CreateBPMenu/BPMenu";

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

    return(
        <div className="AdditionalContent">
            <div className="buttonContainer">
                <StyledButton
                    style={{ marginRight: "10px" }}
                    onClick={handleCreateProjectClick}
                >
                    Create Blade Project
                </StyledButton>
                <StyledButton onClick={handleCreateTaskClick}>
                    Create Blade Task
                </StyledButton>
            </div>
            {creationMenu === "createTask" && <BladeTaskMenu/>}
            {creationMenu ==="createProject" && <BladeProjectMenu/>}
        </div>
    );
}

export default CreateAdditionalContent;
