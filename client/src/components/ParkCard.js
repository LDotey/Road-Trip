import React from "react";

function ParkCard({ park }) {
  return (
    <div className="park-card">
      <img src={park.image} alt={park.name} className="park-card-image" />
      <h3 className="park=card-title">{park.name}</h3>
      <p className="park-card-state">{park.state}</p>
    </div>
  );
}

export default ParkCard;
