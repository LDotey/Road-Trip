import { useContext } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./AppContext";
import ParkCard from "./ParkCard";

function ParkPage() {
  const { parks } = useContext(MyContext);
  // const history = useHistory();
  const navigate = useNavigate();

  const handleParkClick = (parkId) => {
    navigate(`/park/${parkId}`);
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
