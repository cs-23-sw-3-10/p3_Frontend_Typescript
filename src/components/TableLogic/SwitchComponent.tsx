import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useEditModeContext } from "../../EditModeContext";
import PopupWindow from "../ui/PopupWindow";
import Login from "../ui/login";

type SwitchProps = {
  setShowPasswordPrompt: React.Dispatch<React.SetStateAction<boolean>>;
};

const SwitchComponent = (props: SwitchProps) => {
  const editMode = useEditModeContext();
  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState(""); // State to store the entered password
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  useEffect(() => {
    setChecked(editMode.isEditMode);
  }, [editMode.isEditMode]);

  const handleSwitch = () => {
    console.log("handleSwitch");
    console.log("Auth Token: ", localStorage.getItem('token'));
    console.log("Checked before conditionals: ", checked);

    if (!localStorage.getItem('token') && !checked) {
        setShowPasswordPrompt(true);
        setPassword("");
     
    }
    else if (localStorage.getItem('token') && !checked) {
        editMode.setEditMode(true);
        
    }
    else if (!localStorage.getItem('token') && checked) {
        editMode.setEditMode(false);
    }
    else {
        console.log("Else condition");
        editMode.setEditMode(false);
    
    }

}
  
   // Handle the password submit
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
      <>
       <div className="inline-flex items-center h-full ">
        <div className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center mx-4">
        <span className="label flex items-center text-sm font-medium text-black cursor-auto">
        View Mode
      </span>
      <label>
        <input
          type="checkbox"
          checked={editMode.isEditMode}
          onChange={handleSwitch}
          className="sr-only"
        />
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 cursor-pointer ${
            editMode.isEditMode ? "bg-[#212b36]" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              editMode.isEditMode ? "translate-x-[28px]" : ""
            }`}
          ></span>
        </span>
      </label>
      <span className="label flex items-center text-sm font-medium text-black cursor-auto">
        Edit Mode
      </span>
        </div>
        
      <div>
    </div>
    <div className="mx-4">
    {showPasswordPrompt && <Login  setShowPasswordPrompt={setShowPasswordPrompt}/>}
    </div>
   
    </div>
    
      </>
    )
  }
  
export default SwitchComponent;