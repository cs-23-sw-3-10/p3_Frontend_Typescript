import React, { useEffect, useState } from "react";
import { BTOrder } from "../CreateBTMenu/BTMenuTypes";
import { InputField } from "./Fields";
import DropdownList from "react-widgets/DropdownList";
import { BladeProjectForm } from "./BPMenuTypes";
import { validateBPForm } from "./ValidateBPForm";
import './BPMenu.css';
import { useQuery, useMutation} from "@apollo/client";
import { GET_ALL_ENGINEERS } from "../../api/queryList";
import { ADD_BP } from "../../api/mutationList";


function BladeProjectMenu() {
    const [projectName, setProjectName] = useState<string>('');
    const [customer, setCustomer] = useState<string>('');
    const [leader, setLeader] = useState<string>('')
    const [leaderOptions, setLeaderOptions] = useState<string[]>([]);
    const [equipmentList, setEquipmentList] = useState<string[]>([]);
    const [currentBladeTasks, setCurrentBladeTasks] = useState([]);

    const [addBP, {loading, error }] = useMutation(ADD_BP);
    const {data} = useQuery(GET_ALL_ENGINEERS);

    useEffect(() => {
        if (data && data.AllEngineers) {
            const engineerNamesArray:Array<string> = data.AllEngineers.map(({name}:{name:string}) => name);
            console.log(engineerNamesArray);
            setLeaderOptions(engineerNamesArray);
        }
    }, [data]);


    const currentForm:BladeProjectForm = {
        projectName: projectName,
        customer: customer,
        leader: leader,
        equipmentList: equipmentList,
        bladeTaskList: currentBladeTasks
    }

    useEffect(() => {
        console.log(currentForm)
    },[projectName,customer, leader, equipmentList, currentBladeTasks]);

    const handleSubmit = () => {
        if(validateBPForm(currentForm)){
            addBP({variables:{
                name: projectName,
                customer: customer,
                projectLeader: leader,
            }}).then((result) => console.log(result));
        }else console.log("Unable To Submit Form");
    }

    const handleCancel = () => {
        setProjectName('');
        setCustomer('');
        setLeader('');
    }


    return (
        <div className="bp_menu_wrapper">
            <h2 className="bp_menu_title">Project Name</h2>
            <InputField className="input_field" value={projectName} setState={setProjectName}/>

            <h2 className="bp_menu_title">Customer</h2>
            <InputField className="input_field" value={customer} setState={setCustomer}/>

            <h2 className="bp_menu_title">Project Leader</h2>
            <DropdownList className="input_field" value={leader} data={leaderOptions} onChange={value => setLeader(value)}/>

            <button className="bp_menu_cancel" onClick={handleCancel}>CANCEL</button>
            <button className="bp_menu_submit" onClick={handleSubmit}>SUBMIT</button>
        </div>
    );
}

export default BladeProjectMenu;