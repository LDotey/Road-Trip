import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import ParkPage from "./ParkPage";
import ParkDetailPage from "./ParkDetailPage";
import TrailsPage from "./TrailsPage";
import HikersPage from "./HikersPage";
import NavBar from "./NavBar";

function App() {
  return (
    <AppProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/parks" component={ParkPage} />
          <Route path="/park/:id" component={ParkDetailPage} />
          <Route path="/trails" component={TrailsPage} />
          <Route path="/hikers" component={HikersPage} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;

{
  /* <div>
          <h1>Project Client</h1>
          <ParkPage />
        </div> */
}
