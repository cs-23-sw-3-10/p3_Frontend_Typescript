import { useQuery } from "@apollo/client";
import { GET_ALL_BT_NAMES } from "../../api/queryList";
import { InErrorChart } from "./BTMenuTypes";


function TaskNameSelector({BTName, setBTName, inErrorChart, setInErrorChart}:{BTName:string, setBTName:Function, setInErrorChart:Function, inErrorChart:InErrorChart}){
    const {loading,error,data} = useQuery(GET_ALL_BT_NAMES);
    if(loading){
        return <div>Loading</div>
    };
    if(error){
        return <div>Error</div>
    };
    
    const taskNamesArray:string[] = data.AllBladeTasks.map(({__typename,taskName}:{__typename:string, taskName:string}) => taskName);
    return <InputComponent BTName={BTName} setBTName={setBTName} existingNames={taskNamesArray} inErrorChart={inErrorChart} setInErrorChart={setInErrorChart}/>
}

function InputComponent({BTName, setBTName, existingNames, inErrorChart, setInErrorChart}:{BTName:string, setBTName:Function, existingNames:string[], inErrorChart:InErrorChart, setInErrorChart:Function}){

    const handleNameInput = (e: React.FormEvent<HTMLInputElement>) =>{
        let userInput = e.currentTarget.value;
        if(!existingNames.includes(userInput)){
            setBTName(sanitize(userInput));
            setInErrorChart((inErrorChart:InErrorChart) => {
                let newInErrorChart = {...inErrorChart};
                newInErrorChart.BTName = false;
                return newInErrorChart;
            });
        }else{
            setBTName(" ");
            setInErrorChart((inErrorChart:InErrorChart) => {
                let newInErrorChart = {...inErrorChart};
                newInErrorChart.BTName = true;
                return newInErrorChart;
            });
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setBTName(e.currentTarget.value);
    }

    return(
        <input 
        className={inErrorChart.BTName ? "error id_select" : 'id_select'}
        type="text" 
        placeholder='Select Task Name'
        value={BTName}
        onChange={handleChange}
        onBlur={handleNameInput}
        /> )
}

function sanitize(input:string){
    const sanitizedString = input.replace(/[^a-zA-Z0-9_ -]/g, '');
    return sanitizedString;
};

export default TaskNameSelector;
