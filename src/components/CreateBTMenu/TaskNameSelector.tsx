import { useQuery } from "@apollo/client";
import { GET_ALL_BT_NAMES } from "../../api/queryList";
import { InErrorChart } from "./BTMenuTypes";


function TaskNameSelector({taskName, setTaskName, inErrorChart, setInErrorChart}:{taskName:string, setTaskName:Function, setInErrorChart:Function, inErrorChart:InErrorChart}){
    const {loading,error,data} = useQuery(GET_ALL_BT_NAMES);
    if(loading){
        return <div>Loading</div>
    };
    if(error){
        return <div>Error</div>
    };
    
    const taskNamesArray:string[] = data.AllBladeTasks.map(({taskName}:{taskName:string}) => taskName);
    return <InputComponent taskName={taskName} setTaskName={setTaskName} existingNames={taskNamesArray} inErrorChart={inErrorChart} setInErrorChart={setInErrorChart}/>
}

function InputComponent({taskName, setTaskName, existingNames, inErrorChart, setInErrorChart}:{taskName:string, setTaskName:Function, existingNames:string[], inErrorChart:InErrorChart, setInErrorChart:Function}){

    const handleNameInput = (e: React.FormEvent<HTMLInputElement>) =>{
        let userInput = e.currentTarget.value;
        if(!existingNames.includes(userInput)){
            setTaskName(sanitize(userInput));
            setInErrorChart((inErrorChart:InErrorChart) => {
                let newInErrorChart = {...inErrorChart};
                newInErrorChart.taskName = false;
                return newInErrorChart;
            });
        }else{
            setTaskName(" ");
            setInErrorChart((inErrorChart:InErrorChart) => {
                let newInErrorChart = {...inErrorChart};
                newInErrorChart.taskName = true;
                return newInErrorChart;
            });
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value);
    }

    return(
        <input 
        className={inErrorChart.taskName ? "error id_select input" : 'id_select input_sideborders'}
        type="text" 
        placeholder='Select Task Name'
        value={taskName}
        onChange={handleChange}
        onBlur={handleNameInput}
        /> )
}

function sanitize(input:string){
    const sanitizedString = input.replace(/[^a-zA-Z0-9_ -]/g, '');
    return sanitizedString;
};

export default TaskNameSelector;
