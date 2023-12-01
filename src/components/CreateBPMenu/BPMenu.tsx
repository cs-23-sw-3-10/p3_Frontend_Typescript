import React, { useEffect, useState } from "react";
import { BTOrder } from "../CreateBTMenu/BTMenuTypes";
import { InputField } from "./Fields";
import DropdownList from "react-widgets/DropdownList";
import { BladeProjectForm } from "./BPMenuTypes";
import { validateBPForm } from "./ValidateBPForm";
import './BPMenu.css';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_ENGINEERS } from "../../api/queryList";
import { ADD_BP } from "../../api/mutationList";
import { ResourceOrderContext } from "../CreateBTMenu/BladeTaskOrderContext";
import EquipmentSelectionMenu from "../CreateBTMenu/EquipmentSelector";
import { ResourceOrder } from "../CreateBTMenu/BTMenuTypes";
import EquipmentList from "../CreateBTMenu/EquipmentList";
import './EquipmentListBP.css';


function BladeProjectMenu() {
    const [projectName, setProjectName] = useState<string>('');
    const [customer, setCustomer] = useState<string>('');
    const [leader, setLeader] = useState<string>('')
    const [leaderOptions, setLeaderOptions] = useState<string[]>([]);
    const [equipmentList, setEquipmentList] = useState<string[]>([]);
    const [currentBladeTasks, setCurrentBladeTasks] = useState([]);

    const [projectError, setProjectError] = useState<boolean>(false);
    const [missingInput, setMissingInput] = useState<boolean>(false);

    const [equipmentMenuIsActive, setEquipmentMenuIsActive] = useState<boolean>(true);
    const [resourceOrders, setResourceOrders] = useState<ResourceOrder[]>([]);

    const [addBP, { loading, error }] = useMutation(ADD_BP);
    const { data } = useQuery(GET_ALL_ENGINEERS);

    useEffect(() => {
        if (data && data.AllEngineers) {
            const engineerNamesArray: Array<string> = data.AllEngineers.map(({ name }: { name: string }) => name);
            console.log(engineerNamesArray);
            setLeaderOptions(engineerNamesArray);
        }
    }, [data]);

    useEffect(() => {
        console.log(resourceOrders);
    }, [resourceOrders])

    const currentForm: BladeProjectForm = {
        projectName: projectName,
        customer: customer,
        leader: leader,
        equipmentList: equipmentList,
        bladeTaskList: currentBladeTasks
    }

    const handleSubmit = () => {
        if (validateBPForm(currentForm)) {
            addBP({
                variables: {
                    name: projectName,
                    customer: customer,
                    projectLeader: leader,
                }
            }).then((result) => console.log(result));
            setMissingInput(false);
            setProjectError(false);
            handleCancel();
        } else {
            setMissingInput(true);
        }
    }

    const handleCancel = () => {
        setProjectName('');
        setCustomer('');
        setLeader('');
        setResourceOrders([]);
    }


    return (
        <div className="bp_menu_wrapper">
            <ResourceOrderContext.Provider value={setResourceOrders}>
                <h2 className="bp_menu_heading">Create Blade Project</h2>
                <h2 className="bp_menu_title">Project Name</h2>
                <InputField className="input_field" value={projectName} setState={setProjectName} />

                <h2 className="bp_menu_title">Customer</h2>
                <InputField className="input_field" value={customer} setState={setCustomer} />

                <h2 className="bp_menu_title">Project Leader</h2>
                <DropdownList className="input_field" value={leader} data={leaderOptions} onChange={value => setLeader(value)} />
                
                <h2 className="bp_menu_title">Equipment</h2>
                <div className="bp_menu_add_wrapper">
                    <button className="bp_menu_add" onClick={() => setEquipmentMenuIsActive(true)}>+</button>
                </div>
                <EquipmentList resourceOrders={resourceOrders} classNameFor="bp"/>

                <button className="bp_menu_cancel" onClick={handleCancel}>CANCEL</button>
                <button className="bp_menu_submit" onClick={handleSubmit}>SUBMIT</button>
                <ErrorMessageBox projectError={projectError} missingInput={missingInput} />
                {equipmentMenuIsActive ? <EquipmentSelectionMenu setEquipmentActive={setEquipmentMenuIsActive} className="equipment_bp_menu"/> : <></>}
            </ResourceOrderContext.Provider>


        </div>
    );
}

function ErrorMessageBox({ projectError, missingInput }: { projectError: boolean, missingInput: boolean }) {
    return (
        <div className="bp_menu_error_wrapper">
            {projectError ? <p className="bp_menu_error_message">Project name already exists</p> : <p></p>}
            {missingInput ? <p className="bp_menu_error_message">Please fill out the entire form</p> : <p></p>}
        </div>
    );
}

export default BladeProjectMenu;