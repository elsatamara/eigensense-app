import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import HomePage from "../pages/home/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard" component={DashboardPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
