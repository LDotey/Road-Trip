import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { MyContext } from "./AppContext";

function CreateHiker() {
  //   const { setHikers } = useContext(MyContext);
  const context = useContext(MyContext);
  //   console.log(context); // Check if context contains setHikers
  const { setHikers } = context;

  //   const checkEmail = async (email) => {
  //     const response = await fetch(`/api/check-email?email=${email}`);
  //     const data = await response.json();

  //     return !data.exists;
  //   };

  const formSchema = yup.object().shape({
    name: yup.string().required("Hiker name is required"),
    email: yup.string(),
    //   .email("Invalid email")
    //   .required("email is required")
    //   .test("email-unique", "Email is already in use", async (email) => {
    //     const emailUnique = await checkEmail(email);
    //     return emailUnique;
    //   }),
    skill_level: yup.string().required("must enter a skill level"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      //   email: "",
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

        {/* <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}>{formik.errors.email}</p> */}

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
