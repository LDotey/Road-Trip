import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "./AppContext";
import { useFormik } from "formik";
// import CreateTrail from "./NewTrailForm";

function TrailCard({ trail }) {
  console.log("Trail prop in TrailCard:", trail); // Debugging log

  const { trails, updateTrail, deleteTrail } = useContext(MyContext);
  const [isEditing, setIsEditing] = useState(false);

  // Formik form for editing the trail
  const formik = useFormik({
    initialValues: {
      name: trail.name,
      difficulty: trail.difficulty,
      dog_friendly: trail.dog_friendly,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Formik Values:", formik.values);
      console.log("Valeues:", values);

      // Only update if the values are different from the initial trail values
      if (
        values.name !== trail.name ||
        values.difficulty !== trail.difficulty ||
        values.dog_friendly !== trail.dog_friendly
      ) {
        updateTrail(trail.id, values);
        console.log(trail); // Call the updateTrail function passed from the context
      }
      setIsEditing(false); // Exit the editing mode once the update is done
    },
  });

  // Toggle edit mode when the "Edit" button is clicked
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  // const handleDeleteTrail = () => {
  //   deleteTrail();
  // };
  return (
    <div className="trail-card">
      {/* Trail Name */}
      {isEditing ? (
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      ) : (
        <h4>{trail.name}</h4>
      )}

      {/* Difficulty */}
      {isEditing ? (
        <input
          type="text"
          name="difficulty"
          value={formik.values.difficulty}
          onChange={formik.handleChange}
        />
      ) : (
        <p>Difficulty: {trail.difficulty}</p>
      )}

      {/* Dog Friendly */}
      {isEditing ? (
        <label>
          Dog Friendly:
          <input
            name="dog_friendly"
            type="checkbox"
            checked={formik.values.dog_friendly}
            onChange={formik.handleChange}
          />
        </label>
      ) : (
        <p>Dog Friendly: {trail.dog_friendly ? "Yes" : "No"}</p>
      )}

      {/* Button to toggle edit mode */}
      <button onClick={handleEditClick}>
        {isEditing ? "Cancel" : "Edit this Trail"}
      </button>
      <br />
      {/* <button onClick={deleteTrail}> Delete this Trail </button> */}
      <button onClick={() => deleteTrail(trail.id)}>Delete this Trail</button>

      {/* If editing, submit the form */}
      {isEditing && (
        <button type="submit" onClick={formik.handleSubmit}>
          Save Changes
        </button>
      )}
    </div>
  );

  // useEffect(() => {
  //   console.log("Trails updated:", trails);
  // }, [trails]);
  // return (
  //   <div className="trail-card">
  //     <h4>{trail.name}</h4>
  //     <p>Difficulty: {trail.difficulty}</p>
  //     <p>Dog Friendly: {trail.dog_friendly ? "Yes" : "No"}</p>
  //   </div>
  // );
}
export default TrailCard;
