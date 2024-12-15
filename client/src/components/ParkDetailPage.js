import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "./AppContext";
import TrailCard from "./TrailsPage";

function ParkDetailPage() {
  const { id } = useParams();
  const { parks, trails } = useContext(AppContext);
  const [park, setPark] = useState(null);
  const [filteredTrails, setFilteredTrails] = useState([]);

  console.log("pakr id from url:", id);
  useEffect(() => {
    console.log("loading park details...");
    console.log("All trails:", trails);
    const selectedPark = parks.find((park) => park.id === parseInt(id));
    setPark(selectedPark);
    //   }, [id, parks]);

    const parkTrails = trails.filter((trail) => {
      console.log(
        "Trail ID:",
        trail.id,
        "Trail Park ID:",
        trail.park_id,
        "URL Park ID:",
        id
      );
      return trail.park_id === parseInt(id);
    });

    setFilteredTrails(parkTrails);
    console.log("Filtered Trails:", parkTrails);
  }, [id, parks]);

  if (!park) return <div>Loading...</div>;

  return (
    <div className="park-detail">
      <h2>{park.name}</h2>
      <img src={park.image} alt={park.name} className="park-image" />
      <p>{park.state}</p>

      <h2>{park.name} Trails</h2>
      <div className="trails-grid">
        {filteredTrails.map((trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </div>
    </div>
  );
}

export default ParkDetailPage;
