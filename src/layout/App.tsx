import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdministrationPage from "../pages/administration/AdministrationPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import HomePage from "../pages/home/HomePage";
import NotificationPage from "../pages/notification/NotificationPage";
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
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/admin" element={<AdministrationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
