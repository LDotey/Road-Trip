import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.js";
import AppContext from "./AppContext.js";
import ParkCard from "./ParkCard";

function ParkPage() {
  const { parks } = useContext(AppContext);
  const history = useHistory();

  const handleParkClick = (parkId) => {
    history.push(`/park/${parkId}`);
  };

  return (
    <div>
      <h2>Take a Hike!</h2>
      <div className="parks-grid">
        {parks.length === 0 ? (
          <p>Loading parks...</p>
        ) : (
          parks.map((park) => (
            <ParkCard key={park.id} park={park} onClick={handleParkClick} />
          ))
        )}
      </div>
    </div>
  );
}

export default ParkPage;
