import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/parks">Parks</NavLink>
        </li>
        <li>
          <NavLink to="/trails">Trails</NavLink>
        </li>
        <li>
          <NavLink to="/hikers">Hikers</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
