import { useContext } from "react";
import AppContext from "/AppContext.js";
import ParkCard from "./ParkCard";

function ParkPage() {
  const { parks } = useContext(AppContext);

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
