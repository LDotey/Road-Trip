import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <p>
          <NavLink to="/parks">Parks</NavLink>
        </p>
        {/* <li>
          <NavLink to="/trails">Trails</NavLink>
        </li> */}
        <p>
          <NavLink to="/hikers">Hikers</NavLink>
        </p>
      </ul>
    </nav>
  );
}

export default NavBar;
