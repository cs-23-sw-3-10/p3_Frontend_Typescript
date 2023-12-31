import React, { useEffect, useState } from "react";
import { useEditModeContext } from "../../EditModeContext";
import Login from "../ui/login";

type SwitchProps = {
    setShowPasswordPrompt: React.Dispatch<React.SetStateAction<boolean>>;
};

const SwitchComponent = (props: SwitchProps) => {
    const editMode = useEditModeContext();
    const [checked, setChecked] = useState(false);
    const [password, setPassword] = useState(""); // State to store the entered password
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    useEffect(() => {
        setChecked(editMode.isEditMode);
    }, [editMode.isEditMode]);

    const handleSwitch = () => {
        if (!localStorage.getItem("token") && !checked) {
            setShowPasswordPrompt(true);
            setPassword("");
        } else if (localStorage.getItem("token") && !checked) {
            editMode.setEditMode(true);
        } else if (!localStorage.getItem("token") && checked) {
            editMode.setEditMode(false);
        } else {
            editMode.setEditMode(false);
        }
    };

    return (
        <>
            <div className="inline-flex items-center h-full ">
                <div className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center mx-4">
                    {/* Highlight "View" text based on editMode */}
                    <span className={`label flex items-center text-sm font-medium cursor-auto ${!editMode.isEditMode ? "text-black" : "text-gray"}`}>View</span>
                    <label>
                        <input type="checkbox" checked={editMode.isEditMode} onChange={handleSwitch} className="sr-only" />
                        <span
                            className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 cursor-pointer ${
                                editMode.isEditMode ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                            }`}
                        >
                            <span className={`dot h-6 w-6 rounded-full bg-white duration-200 ${editMode.isEditMode ? "translate-x-[28px]" : ""}`}></span>
                        </span>
                    </label>
                    {/* Highlight "Edit" text based on editMode */}
                    <span className={`label flex items-center text-sm font-medium cursor-auto ${editMode.isEditMode ? "text-green" : "text-blue"}`}>Edit</span>
                </div>

                <div></div>
                <div className="mx-4">{showPasswordPrompt && <Login setShowPasswordPrompt={setShowPasswordPrompt} />}</div>
            </div>
        </>
    );
};

export default SwitchComponent;
