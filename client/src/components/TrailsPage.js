import React, { useContext } from "react";
import { MyContext } from "./AppContext";
// import CreateTrail from "./NewTrailForm";

function TrailCard({ trail }) {
  const { parks, trails } = useContext(MyContext);
  // const park = parks.find((p) => p.id === park_id);

  return (
    <div className="trail-card">
      <h4>{trail.name}</h4>
      <p>Difficulty: {trail.difficulty}</p>
      <p>Dog Friendly: {trail.dog_friendly ? "Yes" : "No"}</p>
    </div>
  );
}
export default TrailCard;

// function TrailCard() {
//   const { trail, parks } = useContext(MyContext);

//   return (
//     <div>
//       {/* <h2>Trails</h2> */}
//       <ul>
//         {trail.map((trail) => {
//           // Find the park that corresponds to the trail's parkId
//           const park = parks.find((park) => park.id === trail.park_id);

//           return (
//             <li key={trail.id}>
//               {trail.name} - Difficulty: {trail.difficulty} - Dog Friendly:{" "}
//               {trail.dog_friendly ? "Yes" : "No"} - Park:{" "}
//               {park ? park.name : "Park not found"}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
