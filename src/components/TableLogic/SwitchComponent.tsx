import React from "react";
import { useState, useContext } from "react";
import { useEditModeContext } from "../../EditModeContext";

type SwitchProps = {
  setShowPasswordPrompt: React.Dispatch<React.SetStateAction<boolean>>;
};

const SwitchComponent = (props: SwitchProps) => {
  const editMode = useEditModeContext();
  const [checked, setChecked] = useState(editMode.isEditMode)
  const [password, setPassword] = useState(""); // State to store the entered password
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const handleSwitch = () => {
    setChecked(!checked)  
     if(!editMode.isEditMode){
        setShowPasswordPrompt(true); // Show the password prompt
        setPassword(""); //reset password
         if(checked === true){
          setShowPasswordPrompt(false) // Hide the password prompt if the user clicks the switch again before entering the password
        }
      }
      else{
        setShowPasswordPrompt(false)
        editMode.setEditMode(false)
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
       <div className="inline-flex items-center h-full">
        <div className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center mx-4">
        <span className="label flex items-center text-sm font-medium text-black cursor-auto">
        View Mode
      </span>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleSwitch}
          className="sr-only"
        />
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 cursor-pointer ${
            checked ? "bg-[#212b36]" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              checked ? "translate-x-[28px]" : ""
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
    {showPasswordPrompt && (
                <div className="PasswordPrompt inline-block">
                    <form onSubmit={(e) => {e.preventDefault(); handlePasswordSubmit(e)}}>
                        <label className="text-sm" htmlFor="passwordInput">Enter Password:</label>
        
                        <input
                        className="w-20 inline-block border rounded h-4 border-black"
                            type="password"
                            id="passwordInput"
                            name="passwordInput"
                            defaultValue={password}
                        />
                    </form>
                </div>
            )}
    </div>
   
    </div>
    
      </>
    )
  }
  
export default SwitchComponent;