import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import ParkPage from "./ParkPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <h1>Project Client</h1>
          <ParkPage />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
