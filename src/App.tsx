import NavBar from "./components/NavBar/NavBar";
import ResourceTable from "./components/ResourcesMenu/ResourceTable";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ScheduleComponent from "./components/Schedule/ScheduleComponent";
import BTPage from "./components/BladeTask/BladeTaskPage";
import BladeProjectPage from "./components/BladeProject/BladeProjectPage";

function App() {
    return (
        <>
            <div className="app-container">
                    <NavBar />
                    <div className="content-container">
                        <Routes>
                            <Route path="/" element={<ScheduleComponent />} />
                            <Route path="/projects" element={<BladeProjectPage />} />
                            <Route path="/bladetask" element={<BTPage />} />
                            <Route path="/resources" element={<ResourceTable />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
            </div>
        </>
    );
}
export default App;
