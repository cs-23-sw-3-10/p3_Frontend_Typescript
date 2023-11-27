import React, {useState, useMemo, SetStateAction, Dispatch}from "react";
//Ville nok være en god ide bare at importere alt fra components
import NavBar from "./components/NavBar/NavBar";
import EquipmentPage from "./components/Resources/EquipmentPage";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ScheduleComponent from "./components/Schedule/ScheduleComponent";
import BladeProjectPage from "./components/Projects/BladeProjectPage";
import BTPage from "./components/BladeTask/BladeTaskPage";
import BladeProjectPageWithSchedule from "./components/Projects/BladeProjectPageSchedule";
import BladeProjectPageWithScheduleViewEdit from "./components/Projects/BladeProjectPageEditView";


import { EditModeProvider } from "./EditModeContext";
import BladeTaskMenu from "./components/CreateBTMenu/BladeTaskMenu";
import { TableModeContext } from "./components/TableLogic/TableContext";



function App() {
    const [contextViewMode, setViewMode] = useState(true);

    return (
        <>
            <div className="app-container">
                <NavBar />
                <div className="content-container">
                    <EditModeProvider>
                    <TableModeContext.Provider value={{contextViewMode, setViewMode}}>
                    <Routes>
                        <Route path="/" element={<ScheduleComponent/>} />
                        <Route
                            path="/projects"
                            element={<BladeProjectPageWithScheduleViewEdit />}
                        />
                        <Route path="/bladetask" element={<BTPage />} />
                        <Route path="/resources" element={<EquipmentPage />} />
                       
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    </TableModeContext.Provider>
                    </EditModeProvider>
                </div>
            </div>
        </>
    );
}
export default App;
