import { useEffect, useState } from "react";
import { useContext } from "react";
import ParksContext from "./ParksContext";
import ParkCard from "./ParkCard";

function ParkPage() {
  const { parks } = useContext(ParksContext);

  //   useEffect(() => {
  //     fetch("/parks")
  //       .then((r) => r.json())
  //       .then((parksArray) => {
  //         setParks(parksArray);
  //       });
  //   }, []);

  return (
    <div>
      <h2>Take a Hike!</h2>
      <div className="parks-grid">
        {parks.map((park) => (
          <ParkCard key={park.id} park={park} />
        ))}
        {/* {parks.length === 0 ? (
          <p>Loading parks...</p>
        ) : (
          parks.map((park) => (
            <ParkCard key={park.id} park={park} />
          ))
        )} */}
      </div>
    </div>
  );
}

export default ParkPage;
