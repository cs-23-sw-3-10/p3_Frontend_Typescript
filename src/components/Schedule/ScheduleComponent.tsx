import DisplayComponent from "./Display";
import { useState } from "react";
import {useEditModeContext} from "../../EditModeContext";

export const passwordPromptHeight=30;

function ScheduleComponent() {
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
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

    return (
        <div>
           {editMode.isEditMode ? editSchedule : viewSchedule}
        </div>
    );
}
export default ScheduleComponent;

