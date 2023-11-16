import React from "react";
//Ville nok være en god ide bare at importere alt fra components
import NavBar from "./components/NavBar/NavBar";
import BPOverviewPage from "./components/Projects/BPOverviewPage";
import EquipmentPage from './components/Resources/EquipmentPage';
import BladeTaskMenu from "./components/CreateBTMenu/BladeTaskMenu";
import { Routes, Route, Navigate } from 'react-router-dom';
import ResourceTable from "./components/RessourcesMenu/RessourceTable";
import './App.css';

import AddResourceTable from "./components/RessourcesMenu/TechnicianTable";

function App() {
    return (
        <>
            <div className="app-container">
                <NavBar />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<BladeTaskMenu/>} />
                        <Route path="/projects" element={<BPOverviewPage />} />
                        <Route path="/resources" element={<ResourceTable/>} />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
export default App;
