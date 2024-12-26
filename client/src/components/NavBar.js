import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <p>
        <NavLink to="/parks">Parks</NavLink>
      </p>
      {/* <li>
          <NavLink to="/trails">Trails</NavLink>
        </li> */}
      <p>
        <NavLink to="/hikers">Hikers</NavLink>
      </p>
    </nav>
  );
}

export default NavBar;
