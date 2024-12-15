import React from "react";
// import { useHistory } from "react-router-dom";

function ParkCard({ park, onClick }) {
  // const history = useHistory();

  const handleClick = () => {
    console.log(`Clicked on park with ID: ${park.id}`);
    onClick(park.id);
  };

  return (
    <div className="park-card" onClick={handleClick}>
      <img src={park.image} alt={park.name} className="park-card-image" />
      <h3 className="park=card-title">{park.name}</h3>
      <p className="park-card-state">{park.state}</p>
    </div>
  );
}

export default ParkCard;
