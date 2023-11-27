import React from "react";
import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BP } from "../../api/queryList";
import { GET_ALL_BP_IN_DIFF_SCHEDULE } from "../../api/queryList";
import { TableModeContext } from "./TableContext";

const SwitchComponent = ({viewMode} : {viewMode: boolean}) => {
   const [checked, isChecked] = useState(false)
   const {contextViewMode, setViewMode} = useContext(TableModeContext)

/*
   const {
        loading: loadingBP,
        error: errorBP,
        data: dataBP,
    } = useQuery(GET_ALL_BP);


    const { 
        loading: loadingSchedule, 
        error: errorSchedule, 
        data: dataSchedule,
     } = useQuery(GET_ALL_BP_IN_DIFF_SCHEDULE);

  
    //handle loading and error states for the used queries
    if (loadingBP) return <p>Loading...</p>;
    if (errorBP) return <p> Error {errorBP.message}</p>;
    const BPData = dataBP["AllBladeProjects"];
    if (!BPData) {
        return <p> No data for {"AllBladeProjects"} </p>;
    }

    //
    if (loadingSchedule) return <p>Loading...</p>;
    if (errorSchedule) return <p> Error {errorSchedule.message}</p>;
    const ScheduleData = dataSchedule["AllSchedules"];
    if (!ScheduleData) {
        return <p> No data for {"AllSchedules"} </p>;
    }


    const handleSwitch = () => {
      isChecked(!checked)
      if(checked === true){

        scheduleIsActiveCheck = ScheduleData.find((scheduleIsActiveCheck: any) => scheduleIsActiveCheck.id === "1")?.bladeProject
        console.log(scheduleIsActiveCheck)
        return scheduleIsActiveCheck
      }
      else if(checked === false){
       scheduleIsActiveCheck = ScheduleData.find((scheduleIsActiveCheck: any) => scheduleIsActiveCheck.id === "2").bladeProject
        console.log(scheduleIsActiveCheck)
        return scheduleIsActiveCheck
      }
    }*/

    const handleSwitch = () => {
        isChecked(!checked)
        if(checked === true){
            setViewMode(true)
            console.log("CurrentMODE:",contextViewMode)
        }
        else if(checked === false){
            setViewMode(false)
            console.log("CURRENTMODE:",contextViewMode)
        }
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
          checked={checked}
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