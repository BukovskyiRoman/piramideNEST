import React from "react";
import { Routes, Router, Route } from "react-router-dom";
import MainPage from "./routes/main-page";

function App() {
    return (
       <Router>
           <Routes>
               <Route path="/" element={<MainPage />} />
           </Routes>
       </Router>
    );
}

export default App;
