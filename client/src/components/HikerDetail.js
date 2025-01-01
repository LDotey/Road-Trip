import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "./AppContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function HikerDetail() {
  const { id } = useParams();
  const { hiker, setHiker, hikers, trails, updateHiker, deleteHiker } =
    useContext(MyContext);
  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
  const navigate = useNavigate();

  useEffect(() => {
    // Find the hiker from the context based on the `id` from URL
    const foundHiker = hikers.find((hiker) => hiker.id === parseInt(id));
    if (foundHiker) {
      setHiker(foundHiker); // Update context with found hiker
    }
  }, [id, hikers, setHiker]);

  const formik = useFormik({
    initialValues: {
      name: hiker ? hiker.name : "",
      skill_level: hiker ? hiker.skill_level : "",
      trails: hiker ? hiker.trails : [],
    },
    enableReinitialize: true, // ensure Formik reinitializes if `hiker` changes
    validationSchema: yup.object({
      name: yup.string().required("Hiker name is required"),
      skill_level: yup.string().required("Skill level is required"),
      // trails: yup.string().required("Trail names are required"),
    }),
    onSubmit: (values) => {
      console.log("Formik values:", values);
      // only update if something has changed
      if (
        values.name !== hiker.name ||
        values.skill_level !== hiker.skill_level ||
        JSON.stringify(values.trails) !== JSON.stringify(hiker.trails)
      ) {
        const updatedHikerData = {
          ...values, //  includes name, skill_level, and trails
        };
        updateHiker(hiker.id, updatedHikerData); // Update hiker info in context
      }
      setIsEditing(false); // Exit edit mode after submit
    },
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing); // toggle the edit mode
  };

  // Handle trail selection
  // find the full trail object by its name and store that in Formik's values.

  const handleTrailSelect = (e) => {
    const selectedTrailName = e.target.value;
    const selectedTrail = trails.find(
      (trail) => trail.name === selectedTrailName
    );

    // Store the full trail object in Formik values
    if (selectedTrail && !formik.values.trails.includes(selectedTrail)) {
      formik.setFieldValue("trails", [...formik.values.trails, selectedTrail]);
    }
  };

  // Remove a trail from the list of hiked trails
  const handleRemoveTrail = (trail) => {
    const updatedTrails = formik.values.trails.filter((t) => t !== trail);
    formik.setFieldValue("trails", updatedTrails);
  };
  const handleDeleteClick = async () => {
    try {
      // Call the deleteHiker function to remove the hiker
      await deleteHiker(hiker.id);

      // After deletion, navigate back to the hikers page
      navigate("/hikers");
    } catch (error) {
      console.error("Error deleting hiker:", error);
    }
  };

  if (!hiker) {
    return <div>Loading...</div>;
  }
  // console.log("formik.values.trails:", formik.values.trails);
  return (
    <div>
      <h2>Hiker Details:</h2>

      {/* Conditional rendering based on whether we are editing or viewing */}
      {isEditing ? (
        <form onSubmit={formik.handleSubmit}>
          {/* Name field */}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            )}
          </div>

          {/* Skill Level field */}
          <div>
            <label htmlFor="skill_level">Skill Level:</label>
            <select
              id="skill_level"
              name="skill_level"
              value={formik.values.skill_level}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            {formik.touched.skill_level && formik.errors.skill_level && (
              <div style={{ color: "red" }}>{formik.errors.skill_level}</div>
            )}
          </div>

          {/* Hiked Trails field */}
          <div>
            <label htmlFor="trails"> Hiked trails: </label>
            <select
              id="trails"
              name="trails"
              value=""
              onChange={handleTrailSelect}
            >
              <option value="">Select a trail</option>
              {trails.map((trail) => (
                <option key={trail.id} value={trail.name}>
                  {trail.name}
                </option>
              ))}
            </select>
            <div>
              <h4>Selected Trails:</h4>
              {formik.values.trails.length > 0 ? (
                formik.values.trails.map((trail) => (
                  <div key={trail.id}>
                    {trail.name} - Difficulty: {trail.difficulty}
                    <button
                      type="button"
                      onClick={() => handleRemoveTrail(trail)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p>No trails selected yet.</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div>
          {/* Display hiker details when not in editing mode */}
          <h3>{hiker.name}</h3>
          <p>Skill Level: {hiker.skill_level}</p>
          <h3>Trails Hiked:</h3>
          {formik.values.trails.length > 0 ? (
            formik.values.trails.map((trail) => (
              <p key={trail.id}>
                {trail.name} - Difficulty: {trail.difficulty}
              </p>
            ))
          ) : (
            <p>No trails selected yet.</p>
          )}
          <br />
          <button onClick={handleEditClick}>Edit this Hiker</button>
          <br />
          <br />
          <button onClick={handleDeleteClick}>Delete this Hiker</button>
        </div>
      )}
    </div>
  );
}

export default HikerDetail;

// Delete hiker
// const handleDelete = (id) => {
//   console.log("Deleting hiker with ID:", id); //  confirm the ID being passed

//   fetch(`/hikers/${id}`, {
//     method: "DELETE",
//   })
//     .then((response) => {
//       if (response.ok) {
//         setHikers((prev) => prev.filter((hiker) => hiker.id !== id));

//         navigate("/hikers");
//       } else {
//         console.error("Failed to delete hiker");
//       }
//     })
//     .catch((error) => {
//       console.error("Error deleting hiker:", error);
//     });
// };
// const handleDelete = (id) => {
//   fetch(`/hikers/${id}`, {
//     method: "DELETE",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Deleted Hiker response:", data);

//       if (data.message === "Hiker deleted successfully") {
//         const updatedHikers = parks.map((park) => {
//           if (park.id === data.park_id) {
//             park.hikers = park.hikers.filter((hiker) => hiker.id !== id);
//           }
//           return park;
//         });
//         // updated parks state
//         console.log("updated parks after deleting hiker:", updatedHikers);

//         setHikers(updatedHikers);

//         const updatedTrails = trails.filter((trail) => trail.id !== id);
//         setTrails(updatedTrails);
//       } else {
//         console.error("failed to delete hiker", data);
//       }
//     })
//     .catch((error) => {
//       console.error("error deleting trail:", error);
//     });
// };
