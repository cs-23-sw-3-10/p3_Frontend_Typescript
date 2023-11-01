import React from "react";
import "./RadioButtons.css";

//Declaring types of props
type RadioButtonsProps= {
    options: string[];
    name: string;
    defaultCheckedOption: string;
}

/**
 * @param {string[]}  options: Array of options represented by the radio buttons
 * @param {string}  name: Name of the group of radio buttons. Only one button in the group can be checked at given time.
 * @param {string}  defaultCheckedOption: option to be checked as default. To-do: We should throw error if defaultOptionChecked does not correspond to one of the options
 * @returns
 */
const RadioButtons= ({options,name,defaultCheckedOption}:RadioButtonsProps) => {
    const handleOptionChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Option selected: " + changeEvent.target.value);//Here we should make call to server. 
    };

    return (
        <div onChange={handleOptionChange} className="radiobuttons">
            {options.map((option) => (
                <label key={option}> {/*good practice to give key as unique identifier of elements in the list.  */}
                    <input
                        type="radio"
                        value={option}
                        name={name}
                        defaultChecked={option === defaultCheckedOption}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};

export default RadioButtons;
