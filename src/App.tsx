//Ville nok være en god ide bare at importere alt fra components
import NavBar from "./components/NavBar/NavBar";

import ResourceTable from "./components/RessourcesMenu/RessourceTable";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ScheduleComponent from "./components/Schedule/ScheduleComponent";
import BTPage from "./components/BladeTask/BladeTaskPage";
import BladeProjectPage from "./components/Projects/BladeProjectPage";


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
                            element={<BladeProjectPage />}
                        />
                        <Route path="/bladetask" element={<BTPage />} />
                        <Route path="/resources" element={<ResourceTable/>} />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    </EditModeProvider>

                </div>
                <button onClick={()=>{localStorage.clear()}}>Clear auth</button>
            </div>
        </>
    );
}
export default App;
