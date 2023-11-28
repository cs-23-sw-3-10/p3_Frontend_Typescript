import React from "react";
import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BP } from "../../api/queryList";
import { GET_ALL_BP_IN_DIFF_SCHEDULE } from "../../api/queryList";
import { useEditModeContext } from "../../EditModeContext";

const SwitchComponent = () => {
   const editMode = useEditModeContext();
   const [checked, setChecked] = useState(editMode.isEditMode)


    const handleSwitch = () => {
        editMode.setEditMode(!editMode.isEditMode)
        setChecked(!checked)
        }
  
    return (
      <>
       <div className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
      <span className='label flex items-center text-sm font-medium text-black cursor-auto'>
        View Mode
      </span>
      <label>
        <input
          type='checkbox'
          onChange={handleSwitch}
          className='sr-only'
        />
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 cursor-pointer ${
            checked ? 'bg-[#212b36]' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              checked ? 'translate-x-[28px]' : ''
            }`}
          ></span>
        </span>
      </label>
      <span className='label flex items-center text-sm font-medium text-black cursor-auto'>
        Edit Mode
      </span>
    </div>
      </>
    )
  }
  
export default SwitchComponent;