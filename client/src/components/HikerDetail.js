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
      <h2>Hiker Details:</h2>
      <h3>{hiker.name}</h3>
      <p>Skill Level: {hiker.skill_level}</p>
      <h3>Trails Hiked:</h3>

      {hikerTrails.map((trail) => (
        <p key={trail.id}>
          {trail.name} - Difficulty: {trail.difficulty}
        </p>
      ))}
    </div>
  );
}

export default HikerDetail;
