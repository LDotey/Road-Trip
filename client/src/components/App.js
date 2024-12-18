import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyProvider } from "./AppContext";
import { Outlet } from "react-router-dom";
// import ParkPage from "./ParkPage";
// import ParkDetailPage from "./ParkDetailPage";
// import TrailsPage from "./TrailsPage";
// import HikersPage from "./HikersPage";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <MyProvider>
        <h1>My App</h1>
        <header>
          <NavBar />
        </header>
        <Outlet />
      </MyProvider>
    </div>
  );
}

export default App;

/* <div>
          <h1>Project Client</h1>
          <ParkPage />
        </div> */

/* <Router>
        <NavBar />
        <Routes>
          <Route exact path="/parks" component={ParkPage} />
          <Route path="/park/:id" component={ParkDetailPage} />
          <Route path="/trails" component={TrailsPage} />
          <Route path="/hikers" component={HikersPage} />
        </Routes>
      </Router> */
