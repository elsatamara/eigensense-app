import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import HomePage from "../pages/home/HomePage";
import SingleAlertPage from "../pages/singlealert/SingleAlertPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />\
          <Route path="single-alert" element={<SingleAlertPage />}>
            <Route path=":id" element={<SingleAlertPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
