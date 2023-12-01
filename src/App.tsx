//Ville nok være en god ide bare at importere alt fra components
import NavBar from "./components/NavBar/NavBar";
import EquipmentPage from "./components/Resources/EquipmentPage";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ScheduleComponent from "./components/Schedule/ScheduleComponent";
import BTPage from "./components/BladeTask/BladeTaskPage";
import BladeProjectPageWithSchedule from "./components/Projects/BladeProjectPageSchedule";

import { EditModeProvider } from "./EditModeContext";



function App() {

    return (
        <>
            <div className="app-container">
                <NavBar />
                <div className="content-container">
                    <EditModeProvider>
                    <Routes>
                        <Route path="/" element={<ScheduleComponent/>} />
                        <Route
                            path="/projects"
                            element={<BladeProjectPageWithSchedule />}
                        />
                        <Route path="/bladetask" element={<BTPage />} />
                        <Route path="/resources" element={<EquipmentPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    </EditModeProvider>
                </div>
            </div>
        </>
    );
}
export default App;
