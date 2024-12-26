// import React, { useState, useContext } from "react";
// import { MyContext } from "./AppContext";

// function CreatePark() {
//   const { parks, setParks } = useContext(MyContext);
//   const [parkData, setParkData] = useState({
//     name: "",
//     state: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setParkData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch("/parks", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: parkData.name,
//         state: parkData.state,
//         image: parkData.image,
//       }),
//     })
//       .then((response) => response.json())
//       .then((newPark) => {
//         setParks((prevParks) => [...prevParks, newPark]);
//       })
//       .catch((error) => {
//         console.error("Error creating park:", error);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Park Name:
//         <input
//           type="text"
//           name="name"
//           value={parkData.name}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         State:
//         <input
//           type="text"
//           name="state"
//           value={parkData.state}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Image URL:
//         <input
//           type="text"
//           name="image"
//           value={parkData.image}
//           onChange={handleChange}
//         />
//       </label>
//       <button type="submit">Create Park</button>
//     </form>
//   );
// }

// export default CreatePark;
