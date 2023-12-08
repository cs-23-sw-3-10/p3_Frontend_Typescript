import EngineerTable from "./EngineerTable";
import EquipmentTable from "./EquipmentTable";
import TechnicianTable from "./TechnicianTable";
import "./Resource.css";
import { useEditModeContext } from "../../EditModeContext";

export default function ResourceTable() {
    let editMode = useEditModeContext();

    return (
        <div className="resource-table-container">
            {localStorage.getItem("token") !== null && editMode.isEditMode ? (
                <div>
                    <h1 className="h1-style"> Resources</h1>
                    <h2 className="h2-style">Add, update or remove a resource to/from the database</h2>
                    <p className="p-style">
                        To <b className="bold-text">add</b> a new type, name ect. by simply overwriting the text in the dropdown menu. <br />
                        To <b className="bold-text">update</b>, select the specific resource in the dropdown to update and overwrite the variables and click
                        submit.
                        <br />
                        To <b className="bold-text">delete</b>, select the specific resource in the dropdown to delete and press the delete button.
                    </p>
                    <div className="tables-container">
                        <div className="engineer-table">
                            <EngineerTable />
                        </div>
                        <div className="technician-table">
                            <TechnicianTable />
                        </div>
                        <div className="equipment-table">
                            <EquipmentTable />
                        </div>
                    </div>
                </div>
            ) : (
                <p>To Add, update or remove please enter edit mode</p>
            )}
        </div>
    );
}
