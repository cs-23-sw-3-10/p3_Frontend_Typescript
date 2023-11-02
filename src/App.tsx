import React from 'react';
//Ville nok være en god ide bare at importere alt fra components
import NavBar from "./components/NavBar/NavBar";
import BPOverviewPage from "./components/Projects/BPOverviewPage";
import EquipmentPage from './components/Resources/EquipmentPage';
import Schedule from './components/Schedule/Schedule';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ScheduleComponent from "./ScheduleComponent";



function App() {
  return (
  <>
  <NavBar />
  <Routes>
    <Route path='/' element={<ScheduleComponent/>}/>
    <Route path='/projects' element={<BPOverviewPage/>}/>
    <Route path='/resources' element={<EquipmentPage/>}/>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  </>
  )
  
}
export default App;
