import DisplayComponent from "./Display";
import { useState } from "react";
import { useEditModeContext } from "../../EditModeContext";

export const passwordPromptHeight = 30;

function ScheduleComponent() {
    // Component to display everything related to the schedule
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [filter, setFilter] = useState("None");

    const editMode = useEditModeContext(); // editMode is a boolean that is true if the user is in edit mode

    const viewSchedule = // viewSchedule is the component that is displayed when the user is not in edit mode
        <DisplayComponent setShowPasswordPrompt={setShowPasswordPrompt} showPasswordPrompt={showPasswordPrompt} filter={filter} setFilter={setFilter} />;
    const editSchedule = // editSchedule is the component that is displayed when the user is in edit mode
        <DisplayComponent setShowPasswordPrompt={setShowPasswordPrompt} showPasswordPrompt={showPasswordPrompt} filter={filter} setFilter={setFilter} />;

    return <div>{editMode.isEditMode ? editSchedule : viewSchedule}</div>;
}
export default ScheduleComponent;
