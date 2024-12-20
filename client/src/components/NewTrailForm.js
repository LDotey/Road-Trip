import React, { useState, useContext } from "react";
import { MyContext } from "./AppContext";

function CreateTrail() {
  const { trails, setTrails, parks } = useContext(MyContext);
  const [trailData, setTrailData] = useState({
    name: "",
    difficulty: "",
    dog_friendly: false,
    park_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/trails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: trailData.name,
        difficulty: trailData.difficulty,
        dog_friendly: trailData.dog_friendly,
        park_id: trailData.park_id,
      }),
    })
      .then((response) => response.json())
      .then((newTrail) => {
        setTrails((prevTrails) => [...prevTrails, newTrail]);
      })
      .catch((error) => {
        console.error("Error creating trail:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Trail Name:
        <input
          type="text"
          name="name"
          value={trailData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Difficulty:
        <input
          type="checkbox"
          name="dog_friendly"
          checked={trailData.dog_friendly}
          onChange={(e) =>
            setTrailData({ ...trailData, dog_friendly: e.target.checked })
          }
        />
      </label>
      <label>
        Park:
        <select
          name="park_id"
          value={trailData.park_id}
          onChange={handleChange}
        >
          <option value="">Select a park</option>
          {parks.map((park) => (
            <option key={park.id} value={park.id}>
              {park.name}
            </option>
          ))}
        </select>
        <button type="submit">Create Trail</button>
      </label>
    </form>
  );
}
export default CreateTrail;
