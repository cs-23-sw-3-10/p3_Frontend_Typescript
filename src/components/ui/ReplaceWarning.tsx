import { useMutation, useQuery } from "@apollo/client";
import "./ReplaceWarning.css";
import React, { useState } from "react";
import { CLONE_AND_REPLACE } from "../../api/mutationList";
import { DISCARD_EDIT_CHANGES } from "../../api/mutationList";

type ReplaceWarningProps = {
    mode: string;
    openstate: React.Dispatch<React.SetStateAction<any>>;
};

function ReplaceWarning({ mode, openstate }: ReplaceWarningProps) {
    const [cloneScheduleAndReplace] = useMutation(CLONE_AND_REPLACE);
    const [discardEditChanges] = useMutation(DISCARD_EDIT_CHANGES);

    const [Confirmation, setConfirmation] = useState("");

    function handleReplaceScheduleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (Confirmation === "I Agree") {
            if (mode === "replaceSchedule"){ 
                cloneScheduleAndReplace();
            }
            else
            {
             console.log("Discard changes");
             discardEditChanges();
            }
            openstate("");
        } else {
            setConfirmation("");
            console.log("Confirmation not given");
        }
    }

    function handleCancelClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        openstate("");
    }

    return (
        <div className="replaceWarningContainer">
            <label></label>
            {mode === "replaceSchedule" ? (
                <label>Are you sure you want to replace the active schedule?</label>
            ) : (
                <label>Are you sure you want to discard all changes?</label>
            )}
            <label>Type "I Agree" and press submit to confirm </label>
            <form>
                <input type="text" placeholder="I Agree" value={Confirmation} onChange={(e) => setConfirmation(e.target.value)}></input>
                <div>
                    <button className="submit-button" onClick={(e) => handleReplaceScheduleSubmit(e)}>
                        Submit
                    </button>
                    <button className="delete-button" onClick={(e) => handleCancelClick(e)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReplaceWarning;
