import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "./AppContext";
import TrailCard from "./TrailsPage";
import CreateTrail from "./NewTrailForm";

function ParkDetailPage() {
  const { id } = useParams();
  const { parks, setParks, setTrails } = useContext(MyContext);
  const [park, setPark] = useState(null);

  console.log("park id from url:", id);

  useEffect(() => {
    console.log("loading park details...");

    // Find the selected park by the ID from the URL
    const selectedPark = parks.find((park) => park.id === parseInt(id));
    setPark(selectedPark);
    console.log(selectedPark);
  }, [id, parks]);

  return park ? (
    <div className="park-detail">
      <h2>{park.name}</h2>
      <p>{park.state}</p>
      <img src={park.image} alt={park.name} className="park-image" />
      {/* <p>{park.state}</p> */}

      <h2>{park.name} Trails</h2>

      <div className="trails-grid">
        {park.trails.length === 0 ? (
          <p>No trails found for this park.</p>
        ) : (
          park.trails.map((trail) => {
            return (
              <TrailCard
                key={trail.id}
                trail={trail}
                setTrails={setTrails}
                parks={parks}
                setParks={setParks}
              />
            );
          })
        )}
        <h5>Add a New Trail to this park:</h5>

        <CreateTrail parks={parks} />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default ParkDetailPage;

// (
//   filteredTrails.map((trail) => {
//     // Find the park that corresponds to the trail's parkId
//     const parkForTrail = parks.find((p) => p.id === trail.park_id);
//     return <TrailCard key={trail.id} trail={trail} park={parkForTrail} />;
//   })

//   filteredTrails.map((trail) => (
//     <TrailCard key={trail.id} trail={trail} />

//   fetch(`/parks/${id}/trails`)
//     .then((response) => {
//       // console.log(response);
//       if (!response.ok) {
//         throw new Error("Failed to fetch trails");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       setFilteredTrails(data);
//     });
// }, [id, parks, trails]);

// if (selectedPark) {
//   // Filter the trails for the selected park based on park_id
//   const parkTrails = trails.filter(
//     (trail) => trail.park_id === parseInt(id)
//   );
//   setFilteredTrails(parkTrails); // Set the filtered trails
// }

//   const selectedPark = parks.find((park) => park.id === parseInt(id));
//   setPark(selectedPark);

//   console.log(selectedPark);
//   if (selectedPark) {
//     fetch(`/park/${id}/trails`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch trails");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setFilteredTrails(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching trails:", error);
//       });
//   }
// }, [id, parks]);

// const parkTrails = trails.filter((trail) => {
//   return trail.park_id === parseInt(id);
// });

// setFilteredTrails(parkTrails);
// console.log("Filtered Trails:", parkTrails);

// [id, parks]);
