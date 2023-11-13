import React from "react";
//Ville nok være en god ide bare at importere alt fra components
import NavBar from "./components/NavBar/NavBar";
import EquipmentPage from "./components/Resources/EquipmentPage";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ScheduleComponent from "./components/Schedule/ScheduleComponent";

import BladeProjectPage from "./components/Projects/BPPage";
import BTPage from "./components/BladeTask/BladeTaskPage";

function App() {
    return (
        <>
            <div className="app-container">
                <NavBar />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<ScheduleComponent />} />
                        <Route
                            path="/projects"
                            element={<BladeProjectPage />}
                        />
                        <Route path="/bladetask" element={<BTPage />} />
                        <Route path="/resources" element={<EquipmentPage />} />
                        <Route path="/projects/create" element={"createBP"} />
                        <Route path="/bladetask/create" element={"createBT"} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
export default App;
