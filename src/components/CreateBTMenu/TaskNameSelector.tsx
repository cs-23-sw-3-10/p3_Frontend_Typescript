import { useQuery } from "@apollo/client";
import { GET_ALL_BT_NAMES } from "../../api/queryList";
import { InErrorChart } from "./BTMenuTypes";
import { sanitize } from '../../utils/StringEditing';


function TaskNameSelector({ taskName, setTaskName, inErrorChart, setInErrorChart }: { taskName: string, setTaskName: Function, setInErrorChart: Function, inErrorChart: InErrorChart }) {
    const { loading, error, data } = useQuery(GET_ALL_BT_NAMES);
    if (loading) {
        return <div>Loading</div>
    };
    if (error) {
        return <div>Error</div>
    };

    const taskNamesArray: string[] = data.AllBladeTasks.map(({ taskName }: { taskName: string }) => taskName);
    return <InputComponent taskName={taskName} setTaskName={setTaskName} existingNames={taskNamesArray} inErrorChart={inErrorChart} setInErrorChart={setInErrorChart} />
}

function InputComponent({ taskName, setTaskName, existingNames, inErrorChart, setInErrorChart }: { taskName: string, setTaskName: Function, existingNames: string[], inErrorChart: InErrorChart, setInErrorChart: Function }) {
    let errorMessages: Array<string> =
        ['Invalid Name - Task name exists in Blade Project ',
         'Please provide a Task Name',
        ];

    const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
        let userInput = e.currentTarget.value;
        //Check for illegal characters -> Sanitize
        setTaskName(sanitize(userInput).trim());
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value);
    }

    const hideErrorMessages = (e: React.FormEvent<HTMLInputElement>) => {
        let newInErrorChart = { ...inErrorChart };
        newInErrorChart.taskName[0] = false;
        newInErrorChart.taskName[1] = false;
        setInErrorChart(newInErrorChart);
    }

    //Classname dictates style of component
    return (
        <input
            className={(inErrorChart.taskName[0] || inErrorChart.taskName[1]) ? "error id_select input" : 'id_select input_sideborders'}
            type="text"
            placeholder='Select Task Name'
            value={(inErrorChart.taskName[0] || inErrorChart.taskName[1]) ? (inErrorChart.taskName[0] ? errorMessages[0] : errorMessages[1]) : taskName}
            onChange={handleChange}
            onBlur={handleNameInput}
            onSelect={hideErrorMessages}
        />)
}

export default TaskNameSelector;
