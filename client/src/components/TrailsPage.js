import React from "react";
import { useAppContext } from "./AppContext";

function TrailCard() {
  const { trails } = useAppContext();

  return (
    <div>
      <h2>Trails</h2>
      <ul>
        {trails.map((trail) => (
          <li key={trail.id}>
            {trail.name} - Difficulty: {trail.difficulty} - Dog Friendly:{" "}
            {trail.dog_friendly ? "Yes" : "No"} - Park: {trail.park_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrailCard;
