import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "./AppContext";

function HikerDetail() {
  // get hikers id from URL
  const { id } = useParams();
  const { hikers, trails } = useContext(MyContext);
  const [hiker, setHiker] = useState(null);

  useEffect(() => {
    // find the hiker in the context state based on id
    const foundHiker = hikers.find((hiker) => hiker.id === parseInt(id));
    setHiker(foundHiker);
  }, [id, hikers]);

  if (!hiker) return <div>Loading...</div>;

  // filter by trails this hiker has hiked

  const hikerTrails = trails.filter((trail) => trail.hiker_id === hiker.id);

  return (
    <div>
      <h2>{hiker.name}</h2>
      <p>Skill Level: {hiker.skill_level}</p>
      <h3>Trails Hiked:</h3>
      <ul>
        {hikerTrails.map((trail) => (
          <li key={trail.id}>
            {trail.name} - Difficulty: {trail.difficulty}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HikerDetail;
