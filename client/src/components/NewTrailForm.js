import React, { useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { MyContext } from "./AppContext";
import { useParams } from "react-router-dom";

function CreateTrail() {
  const { setTrails } = useContext(MyContext);
  const { id } = useParams();
  console.log(useParams());

  const parkId = parseInt(id, 10);
  const hikerId = 99;

  const formSchema = yup.object().shape({
    name: yup.string().required("Trail name is required"),
    difficulty: yup.string().required("Difficulty is required"),
    dog_friendly: yup.boolean().required("Dog friendly status is required"),
    park_id: yup.number().positive(),
    hiker_id: yup.number().positive(),
  });
  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      name: "",
      difficulty: "",
      dog_friendly: false,
      park_id: parkId,
      hiker_id: hikerId,
    },

    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log("Form data submitted: ", values);

      // Send the form data to the backend
      fetch("/trails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((newTrail) => {
          console.log(newTrail);
          // Update the state of trails on successful form submission
          setTrails((prevTrails) => [...prevTrails, newTrail]);
        })
        .catch((error) => {
          console.error("Error creating trail:", error);
        });
      console.log(formik.values);
    },
  });
  //   console.log(useParams());

  return (
    <div>
      {/* <CreateTrail onSubmit={formik.handleSubmit} /> */}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Trail Name:</label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}>{formik.errors.name}</p>

        <label htmlFor="difficulty">Difficulty:</label>
        <br />
        <input
          id="difficulty"
          name="difficulty"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.difficulty}
        />
        <p style={{ color: "red" }}>{formik.errors.difficulty}</p>

        <label htmlFor="dog_friendly">Dog Friendly:</label>
        <br />
        <input
          id="dog_friendly"
          name="dog_friendly"
          type="checkbox"
          onChange={formik.handleChange}
          checked={formik.values.dog_friendly}
        />
        <p style={{ color: "red" }}>{formik.errors.dog_friendly}</p>

        <input type="hidden" name="park_id" value={formik.values.park_id} />
        <input type="hidden" name="hiker_id" value={8} />

        <button type="submit">Create Trail</button>
      </form>
    </div>
  );
}

export default CreateTrail;
