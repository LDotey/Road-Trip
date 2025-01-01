import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { MyContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

function CreatePark() {
  const { setParks } = useContext(MyContext);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    name: yup.string().required("Park name is required"),
    state: yup.string().required("State is required"),
    image: yup.string().required("Must include a park image as a URL"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      state: "",
      image: "",
    },

    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log("NewPark form data submitted:", values);

      // Send form data to the backend
      fetch("/parks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((newPark) => {
          console.log(newPark);
          setParks((prevParks) => [...prevParks, newPark]);

          formik.resetForm();
          navigate("/parks");
        })
        .catch((error) => {
          console.error("Error creating park:", error);
        });
      console.log(formik.values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Park Name:</label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}>{formik.errors.name}</p>

        <label htmlFor="state">State:</label>
        <br />
        <input
          id="state"
          name="state"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.state}
        />
        <p style={{ color: "red" }}>{formik.errors.state}</p>

        <label htmlFor="image">Image:</label>
        <br />
        <input
          id="image"
          name="image"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.image}
        />
        <p style={{ color: "red" }}>{formik.errors.image}</p>

        <button type="submit">Create Park</button>
      </form>
    </div>
  );
}

export default CreatePark;
