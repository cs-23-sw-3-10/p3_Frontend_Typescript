import React from "react";
//Ville nok være en god ide bare at importere alt fra components
import NavBar from "./components/NavBar/NavBar";
import EquipmentPage from "./components/Resources/EquipmentPage";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ScheduleComponent from "./components/Schedule/ScheduleComponent";
import ProjectTable from "./components/Projects/ProjectTable";
import BTTable from "./components/BladeTask/BladeTaskTable";

import { columnBP } from "./components/Projects/BPProjectsColumns";
import { GET_ALL_BP } from "./api/queryList";

import { columnEQ } from "./components/Resources/EquipmentColumns";
import { GET_EQUIPMENT } from "./api/queryList";

import { columnBT } from "./components/BladeTask/BTC";
import { columnBTID } from "./components/BladeTask/BTC";
import { GET_ALL_BT } from "./api/queryList";

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
                            element={
                                <ProjectTable
                                    query={GET_ALL_BP}
                                    dataKey="AllBladeProjects"
                                    columns={columnBP}
                                />
                            }
                        />
                        <Route
                            path="/bladetask"
                            element={
                                <BTTable
                                    query={GET_ALL_BT}
                                    dataKey="AllBladeTasks"
                                    columns={columnBTID}
                                />
                            }
                        />
                        <Route
                            path="/resources"
                            element={
                                <EquipmentPage
                                    query={GET_EQUIPMENT}
                                    dataKey="AllEquipment"
                                    columns={columnEQ}
                                />
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
export default App;
