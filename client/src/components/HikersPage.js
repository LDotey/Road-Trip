import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext";

function HikersList() {
  const { hikers } = useAppContext();

  return (
    <div>
      <h2>Hikers</h2>
      <ul>
        {hikers.map((hiker) => (
          <li key={hiker.id}>
            <Link to={`/hiker/${hiker.id}`}>
              {hiker.name} ({hiker.skill_level})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HikersList;
