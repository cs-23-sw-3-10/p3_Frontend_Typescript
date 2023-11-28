import DisplayComponent from "./Display";
import { useState } from "react";
import {useEditModeContext} from "../../EditModeContext";

export const passwordPromptHeight=30;

function ScheduleComponent() {
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [password, setPassword] = useState(""); // State to store the entered password
    const [filter, setFilter] = useState("None"); // State to store the filter

    const editMode = useEditModeContext();

    const viewSchedule = (
        <DisplayComponent
            setShowPasswordPrompt={setShowPasswordPrompt}
            showPasswordPrompt={showPasswordPrompt}
            filter={filter}
            setFilter={setFilter}
        />
    );
    const editSchedule = (
        <DisplayComponent
            setShowPasswordPrompt={setShowPasswordPrompt}
            showPasswordPrompt={showPasswordPrompt}
            filter={filter}
            setFilter={setFilter}
        />
    );

    const scheduleHeader = [<h1>Edit Mode</h1>, <h1>View Mode</h1>];

    const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Get the form element from the event   
        const form = event.target as HTMLFormElement;

        // Explicitly assert the type to HTMLInputElement
        const passwordSubmit = (form.elements.namedItem("passwordInput") as HTMLInputElement)?.value;
       
        setPassword(passwordSubmit);
        // Check the entered password (you can replace "your_password" with the actual password)
        if (passwordSubmit === "123") {
            setShowPasswordPrompt(false);
            editMode.setEditMode(!editMode.isEditMode);
        } else {
            alert("Incorrect password. Please try again.");
        }
    };

    return (
        <div>
            {editMode.isEditMode ? scheduleHeader[0] : scheduleHeader[1]}
            {showPasswordPrompt && (
                <div className="PasswordPrompt" style={{height: `${passwordPromptHeight}px`}}>
                    <form onSubmit={(e) => {e.preventDefault(); handlePasswordSubmit()}}>
                    <label htmlFor="passwordInput">Enter Password:</label>
                    <input
                        type="password"
                        id="passwordInput"
                        name="passwordInput"
                        defaultValue={password}
                    />
                    <input type="submit" value={"Enter"}></input>
                    </form>
                </div>
            )}
            {editMode.isEditMode ? editSchedule : viewSchedule}
        </div>
    );
}
export default ScheduleComponent;

