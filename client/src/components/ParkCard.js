import React, { useState, useContext } from "react";
import { MyContext } from "./AppContext";
import { useFormik } from "formik";

function ParkCard({ park, onClick }) {
  const { updatePark } = useContext(MyContext);
  const [isEditing, setIsEditing] = useState(false);
  // const history = useHistory();

  // Formik form for editing park
  const formik = useFormik({
    initialValues: {
      name: park.name,
      state: park.state,
      image: park.image,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Park formik values:", formik.values);

      // only update if values are diff. from initial values
      if (
        values.name !== park.name ||
        values.state !== park.state ||
        values.image !== park.image
      ) {
        updatePark(park.id, values);
      }
      setIsEditing(false);
    },
  });
  // toggle edit mode when edit button is clicked
  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const handleClick = (e) => {
    // prevent the park card from being clicked when editing
    if (isEditing) {
      return;
    }
    console.log(`Clicked on park with ID: ${park.id}`);
    onClick(park.id);
  };

  return (
    <div className="park-card">
      {/* now the park-card div only contains the park info, not the button */}
      <div className="park-card-content" onClick={handleClick}>
        {isEditing ? (
          <input
            type="text"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
        ) : (
          <img src={park.image} alt={park.name} className="park-card-image" />
        )}

        {isEditing ? (
          <input
            type="text"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
          />
        ) : (
          <h3 className="park=card-title">{park.name}</h3>
        )}

        {isEditing ? (
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        ) : (
          <p className="park-card-state">{park.state}</p>
        )}
      </div>

      <div className="park-card-actions">
        <button onClick={handleEditClick}>
          {isEditing ? "Cancel" : "Edit this park"}
        </button>
        <br />
        {isEditing && (
          <button
            type="submit"
            onClick={(e) => {
              e.stopPropagation(); // prevent the click event from bubbling up to the parent
              formik.handleSubmit(e);
            }}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default ParkCard;
