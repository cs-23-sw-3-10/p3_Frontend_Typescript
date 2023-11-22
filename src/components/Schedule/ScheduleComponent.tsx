import GetBladeTaskDateInfo from "./scheduleQueries";
import DisplayComponent from "./Display";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

function ScheduleComponent() {
    const [editMode, setEditMode] = useState(false);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [password, setPassword] = useState(""); // State to store the entered password
    const [filter, setFilter] = useState("None"); // State to store the filter

    const viewSchedule = (
        <DisplayComponent
            editMode={editMode}
            setEditMode={setEditMode}
            setShowPasswordPrompt={setShowPasswordPrompt}
            filter={filter}
            setFilter={setFilter}
        />
    );
    const editSchedule = (
        <DisplayComponent
            editMode={editMode}
            setEditMode={setEditMode}
            setShowPasswordPrompt={setShowPasswordPrompt}
            filter={filter}
            setFilter={setFilter}
        />
    );

    const scheduleHeader = [<h1>Edit Mode</h1>, <h1>View Mode</h1>];

    const handlePasswordSubmit = () => {
        // Check the entered password (you can replace "your_password" with the actual password)
        if (password === "123") {
            setShowPasswordPrompt(false);
            setEditMode(!editMode);
        } else {
            alert("Incorrect password. Please try again.");
        }
    };

    return (
        
            <div>
                {editMode ? scheduleHeader[0] : scheduleHeader[1]}
                {showPasswordPrompt && (
                    <div className="PasswordPrompt">
                        <label htmlFor="passwordInput">Enter Password:</label>
                        <input
                            type="password"
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handlePasswordSubmit}>Submit</button>
                    </div>
                )}
                {editMode ? editSchedule : viewSchedule}
            </div>
        
    );
}
export default ScheduleComponent;
