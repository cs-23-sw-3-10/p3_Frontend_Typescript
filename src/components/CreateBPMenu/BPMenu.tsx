import { useEffect, useState } from "react";
import { InputField } from "./Fields";
import DropdownList from "react-widgets/DropdownList";
import { BladeProjectForm } from "./BPMenuTypes";
import { validateBPForm } from "./ValidateBPForm";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_ENGINEERS, GET_ALL_BP } from "../../api/queryList";
import { ADD_BP, UPDATE_BP } from "../../api/mutationList";
import { ResourceOrderContext } from "../CreateBTMenu/BladeTaskOrderContext";
import EquipmentSelectionMenu from "../CreateBTMenu/EquipmentSelector";
import { ResourceOrder } from "../CreateBTMenu/BTMenuTypes";
import EquipmentList from "../CreateBTMenu/EquipmentList";
import { capitalize, sanitize } from "../../utils/StringEditing";
import { GET_RESOURCE_ORDER_BY_BP_ID } from "../../api/queryList"; 
import "./EquipmentListBP.css";
import "./BPMenu.css";
import "./EquipmentSelectorBP.css";

//BT menu component is used in multiple places, hence we want to pass props in relation to where the menu is used
//creator -> Creating(true) - Edit(false)
//BPname -> Passed from BP table to component
//popUpClass -> Allows for different styling of identical component
interface BladeProjectMenuProps {
    creator: boolean;
    BPId?: string;
    popUpClass: string;
}

function BladeProjectMenu(props: BladeProjectMenuProps) {
    const creator = props.creator; //Determines Creating or Editing
    let currentBpResourceOrders:ResourceOrder[] = [];
    let currentBP: any;
    console.log(props.BPId);

    //In case of editing a BP -> Fetch all BP's -> Exract current BP
    const { data: BPData } = useQuery(GET_ALL_BP); //Get All Blade Projects
    console.log(BPData);
    currentBP = BPData?.AllBladeProjects?.find((element: any) => element.id === props.BPId);
    console.log(currentBP);
    
   

    //Create -> Set states to "empty"
    //Edit -> Set states to corresponding values in current BP
    const [projectName, setProjectName] = useState<string>(creator ? "" : currentBP.projectName);
    const [customer, setCustomer] = useState<string>(creator ? "" : capitalize(currentBP.customer));
    const [leader, setLeader] = useState<string>(creator ? "" : capitalize(currentBP.projectLeader));
    const [leaderOptions, setLeaderOptions] = useState<string[]>([]);
    const [resourceOrders, setResourceOrders] = useState<ResourceOrder[]>([]);
    const [currentBladeTasks, setCurrentBladeTasks] = useState(creator ? [] : currentBP.bladeTasks);

    const [projectError, setProjectError] = useState<boolean>(false);
    const [missingInput, setMissingInput] = useState<boolean>(false);

    const [equipmentMenuIsActive, setEquipmentMenuIsActive] = useState<boolean>(false);

    const [addBP, { loading, error }] = useMutation(ADD_BP);
    const { data } = useQuery(GET_ALL_ENGINEERS);
    const [updateBP, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_BP);

    const { data: currentBpBookings, refetch} = useQuery(GET_RESOURCE_ORDER_BY_BP_ID, {
        variables:{
            id: currentBP?.id
        }
    });
    refetch();

    useEffect(() => {
        if(currentBpBookings && currentBpBookings.ResourceOrderByBPId){
            currentBpResourceOrders = currentBpBookings.ResourceOrderByBPId.map((
                {resourceName, resourceType, equipmentAssignmentStatus}:
                {resourceName:string, resourceType:string, equipmentAssignmentStatus: Array<boolean>}) => 
                ({resourceType: capitalize(resourceType), resourceName:capitalize(resourceName), equipmentAssignmentStatus: [true,true]}));
            console.log(currentBpBookings);
            setResourceOrders(currentBpResourceOrders);
        }
    },[currentBpBookings]);

    useEffect(() => {
        if (data && data.AllEngineers) {
            //Extract the names of the engineers
            const engineerNamesArray: Array<string> = data.AllEngineers.map(({ name }: { name: string }) => name);

            //You wanted capitalized names so here you go :)
            const capitalizedNames: Array<string> = engineerNamesArray.map((name) => capitalize(name));
            setLeaderOptions(capitalizedNames);
        }
    }, [data]);

    const currentForm: BladeProjectForm = {
        projectName: projectName,
        customer: customer,
        leader: leader,
        equipmentList: resourceOrders,
        bladeTaskList: currentBladeTasks,
    };

    useEffect(() => {
        console.log(currentForm);
    }, [projectName, customer, leader, resourceOrders]);

    useEffect(() => {
        setProjectName(sanitize(projectName));
    }, [projectName]);

    useEffect(() => {
        setCustomer(sanitize(customer));
    }, [customer]);

    const handleSubmit = () => {
        if (creator) {
            if (validateBPForm(currentForm)) {
                addBP({
                    //add blade project to database
                    variables: {
                        name: projectName.toLowerCase().trim(),
                        customer: customer.toLowerCase().trim(),
                        projectLeader: leader.toLowerCase().trim(),
                        resourceOrders: resourceOrders,
                    },
                })
                    .then((result) => console.log(result))
                    .then(() => setMissingInput(false))
                    .then(() => setProjectError(false))
                    .then(() => handleCancel()); //Clears fields
            } else {
                setMissingInput(true);
            }
        } else {
            if (validateBPForm(currentForm)) {
                updateBP({
                    //Update blade project in database
                    variables: {
                        bpId: parseInt(currentBP.id),
                        updates: {
                            scheduleId: currentBP.scheduleId,
                            projectName: projectName,
                            customer: customer,
                            projectLeader: leader,
                            resourceOrders: resourceOrders,
                        },
                    },
                }).then((result) => console.log(result));
                setMissingInput(false);
                setProjectError(false);
                handleCancel();
            } else {
                setMissingInput(true);
            }
        }
    };

    const handleCancel = () => {
        setProjectName("");
        setCustomer("");
        setLeader("");
        setResourceOrders([]);
    };

    return (
        <div className="bp_menu_wrapper">
            <ResourceOrderContext.Provider value={setResourceOrders}>
                {creator ? <h2 className="bp_menu_heading">Create Blade Project</h2> : <h2 className="bp_menu_heading">Edit Blade Project</h2>}
                <h2 className="bp_menu_title">Project Name</h2>
                <InputField className="input_field" value={projectName} setState={setProjectName} />

                <h2 className="bp_menu_title">Customer</h2>
                <InputField className="input_field" value={customer} setState={setCustomer} />

                <h2 className="bp_menu_title">Project Leader</h2>
                <DropdownList className="input_field" value={leader} data={leaderOptions} onChange={(value) => setLeader(value)} />

                <h2 className="bp_menu_title">Equipment</h2>
                <div className="bp_menu_add_wrapper">
                    <button className="bp_menu_add" onClick={() => setEquipmentMenuIsActive(true)}>
                        +
                    </button>
                </div>
                <EquipmentList resourceOrders={resourceOrders} classNameFor={props.popUpClass} />

                <button className="bp_menu_cancel" onClick={handleCancel}>
                    CANCEL
                </button>
                <button className="bp_menu_submit" onClick={handleSubmit}>
                    SUBMIT
                </button>
                <ErrorMessageBox projectError={projectError} missingInput={missingInput} />
                {equipmentMenuIsActive ? <EquipmentSelectionMenu setEquipmentActive={setEquipmentMenuIsActive} className={props.popUpClass} /> : <></>}
            </ResourceOrderContext.Provider>
        </div>
    );
}

function ErrorMessageBox({ projectError, missingInput }: { projectError: boolean; missingInput: boolean }) {
    return (
        <div className="bp_menu_error_wrapper">
            {projectError ? <p className="bp_menu_error_message">Project name already exists</p> : <p></p>}
            {missingInput ? <p className="bp_menu_error_message">Please fill out the entire form</p> : <p></p>}
        </div>
    );
}

export default BladeProjectMenu;
