import { useContext, useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./AppContext";
import ParkCard from "./ParkCard";
import CreatePark from "./NewParkForm";
// import CreatePark from "./OLDParkForm";

function ParkPage() {
  const { parks } = useContext(MyContext);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  const handleParkClick = (parkId) => {
    navigate(`/parks/${parkId}`);
  };

  return (
    <div>
      <h2>Take a Hike!</h2>
      <button onClick={toggleCreateForm}>
        {showCreateForm ? "Cancel" : "Add New Park"}
      </button>

      {showCreateForm && <CreatePark />}

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
