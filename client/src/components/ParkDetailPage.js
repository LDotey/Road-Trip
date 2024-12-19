import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "./AppContext";
import TrailCard from "./TrailsPage";

function ParkDetailPage() {
  const { id } = useParams();
  const { parks, trails } = useContext(MyContext);
  const [park, setPark] = useState(null);
  const [filteredTrails, setFilteredTrails] = useState([]);

  console.log("park id from url:", id);

  useEffect(() => {
    console.log("loading park details...");
    console.log("All trails:", trails);

    const selectedPark = parks.find((park) => park.id === parseInt(id));
    setPark(selectedPark);

    console.log(selectedPark);

    fetch(`/parks/${id}/trails`)
      .then((response) => {
        // console.log("/parks/<int:id>/trails");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch trails");
        }
        return response.json();
      })
      .then((data) => {
        setFilteredTrails(data);
      });
  }, [id, parks, trails]);

  const parkTrails = trails.filter((trail) => {
    return trail.park_id === parseInt(id);
  });

  setFilteredTrails(parkTrails);
  console.log("Filtered Trails:", parkTrails);

  // [id, parks]);

  if (!park) return <div>Loading...</div>;

  return (
    <div className="park-detail">
      <h2>{park.name}</h2>
      <img src={park.image} alt={park.name} className="park-image" />
      <p>{park.state}</p>

      <h2>{park.name} Trails</h2>
      <div className="trails-grid">
        {filteredTrails.length === 0 ? (
          <p>No trails found for this park.</p>
        ) : (
          filteredTrails.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))
        )}
      </div>
    </div>
  );
}

export default ParkDetailPage;
