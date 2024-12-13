import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ParksProvider } from "./ParksContext";
import ParkPage from "./ParkPage";

function App() {
  return (
    <ParksProvider>
      <Router>
        <div>
          <h1>Project Client</h1>
          <ParkPage />
        </div>
      </Router>
    </ParksProvider>
  );
}

export default App;
