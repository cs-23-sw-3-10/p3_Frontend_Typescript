import { useState } from "react";
import BladeTaskMenu from "../CreateBTMenu/BladeTaskMenu";
import StyledButton from "../ui/styledButton";

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
            {creationMenu === "createTask" && <BladeTaskMenu creator={true}/>}
            {creationMenu ==="createProject" && <DummyCreateProject />}
        </div>
    );
}

export default CreateAdditionalContent;

function DummyCreateProject() {
    return (
        <div style={{ height: "500px", width: "300px", background: "red" }}>
            Dummy create BT componenent
        </div>
    );
}
