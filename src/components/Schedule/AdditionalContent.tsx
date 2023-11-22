import { useState } from "react";
import StyledButton from "../ui/styledButton";

function CreateAdditionalContent() {
    const [createTasksAndProjects, setCreateTasksAndProjects] = useState("showButtons");

    const handleCreateProjectClick=()=>{
        console.log("button was clicked")
        setCreateTasksAndProjects("createProject")
    }

    const handleCreateTaskClick=()=>{
        console.log("button was clicked")
        setCreateTasksAndProjects("createTask")
    }

    return (
        <div className="AdditionalContent">
            {createTasksAndProjects==="showButtons" &&
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
            }
            {createTasksAndProjects==="createTask" && <DummyCreateTask />}
            {createTasksAndProjects==="createProject" && <DummyCreateProject />}
        </div>
    );
}
export default CreateAdditionalContent;

function DummyCreateTask() {
    return (
        <div style={{ height: "1000px", width: "600px", background: "blue" }}>
            Dummy create BT componenent
        </div>
    );
}

function DummyCreateProject() {
    return (
        <div style={{ height: "500px", width: "300px", background: "red" }}>
            Dummy create BT componenent
        </div>
    );
}
