import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/parks">Parks</Link>
        </li>
        <li>
          <Link to="/trails">Trails</Link>
        </li>
        <li>
          <Link to="/hikers">Hikers</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
