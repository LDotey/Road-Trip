import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { MyContext } from "./AppContext";

function CreateHiker() {
  const context = useContext(MyContext);
  const { setHikers } = context;

  const formSchema = yup.object().shape({
    name: yup.string().required("Hiker name is required"),
    skill_level: yup.string().required("must enter a skill level"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      skill_level: "",
    },

    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log("NewHiker form submitted:", values);

      // send form data to the backend
      fetch("/hikers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((newHiker) => {
          console.log(newHiker);
          setHikers((prevHikers) => [...prevHikers, newHiker]);

          formik.resetForm();
        })
        .catch((error) => {
          console.error("Error creating hiker:", error);
        });
      console.log(formik.values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Hiker name:</label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}>{formik.errors.name}</p>

        <label htmlFor="skill_level">Skill Level</label>
        <br />
        <input
          id="skill_level"
          name="skill_level"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.skill_level}
        />
        <p style={{ color: "red" }}>{formik.errors.skill_level}</p>

        <button type="submit">Create Hiker</button>
      </form>
    </div>
  );
}
export default CreateHiker;
