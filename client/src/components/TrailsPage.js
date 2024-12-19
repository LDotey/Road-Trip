import React, { useContext } from "react";
// import { MyContext } from "./AppContext";

function TrailCard({ trail, park }) {
  return (
    <div>
      <ul>
        <li key={trail.id}>
          {trail.name} | | Difficulty: {trail.difficulty} | | Dog Friendly:{" "}
          {trail.dog_friendly ? "Yes" : "No"} | | Park:{" "}
          {park ? park.name : "Park not found"}
        </li>
      </ul>
    </div>
  );
}

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

export default TrailCard;
