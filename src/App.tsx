import React from 'react';
import NavBar from "./components/NavBar";
import './App.css';
import ScheduleComponent from "./ScheduleComponent";



function App() {

return (
    <div>
     <div className="App">
       <NavBar />
     </div>
     <div>
         <ScheduleComponent />
     </div>
    </div
    );
}
export default App;
