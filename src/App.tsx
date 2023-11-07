import React from "react";
//Ville nok være en god ide bare at importere alt fra components
import NavBar from "./components/NavBar/NavBar";
import BPOverviewPage from "./components/Projects/BPOverviewPage";
import EquipmentPage from './components/Resources/EquipmentPage';
import BladeTaskMenu from "./components/CreateBTMenu/BladeTaskMenu";
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import ScheduleComponent from "./components/Schedule/ScheduleComponent";

function App() {
    return (
        <>
            <div className="app-container">
                <NavBar />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<BladeTaskMenu/>} />
                        <Route path="/projects" element={<BPOverviewPage />} />
                        <Route path="/resources" element={<EquipmentPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
export default App;
