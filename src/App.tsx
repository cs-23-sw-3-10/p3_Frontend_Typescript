import React, {useState, useMemo, SetStateAction, Dispatch}from "react";
//Ville nok være en god ide bare at importere alt fra components
import NavBar from "./components/NavBar/NavBar";

import ResourceTable from "./components/RessourcesMenu/RessourceTable";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ScheduleComponent from "./components/Schedule/ScheduleComponent";
import BTPage from "./components/BladeTask/BladeTaskPage";
import BladeProjectPageWithSchedule from "./components/Projects/BladeProjectPageSchedule";

import { EditModeProvider } from "./EditModeContext";
import BladeTaskMenu from "./components/CreateBTMenu/BladeTaskMenu";



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
                        <Route path="/resources" element={<ResourceTable/>} />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    </EditModeProvider>
                </div>
            </div>
        </>
    );
}
export default App;
