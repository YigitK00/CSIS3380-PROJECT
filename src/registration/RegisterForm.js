import React from 'react';
import { useFormik } from "formik";
import axios, {AxiosError, AxiosHeaders} from "axios";
import {useState} from 'react';

function RegisterForm() {
  const [error, setError] = useState("");

  const onSubmit = async(values) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        values,
        {
          headers: {"Access-Control-Allow-Origin": true}
        },
      );

    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error)
        setError(err.message);
      
      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      first: "",
      last: "",
      email: "",
      password: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
    onSubmit,
  });

  return (
    <div className="form-container">
    <form onSubmit={formik.handleSubmit}>
      <div className="signup-form">
        <label htmlFor="first">First Name</label>
        <input
          type="text"
          value={formik.values.fname}
          onChange={formik.handleChange}
          placeholder="First Name"
          name="first"
          required
        />
        <label htmlFor="last">Last Name</label>
        <input
          type="text"
          value={formik.values.lname}
          onChange={formik.handleChange}
          placeholder="Last Name"
          name="last"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Email"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Password"
          name="password"
          required
        />

        <button type="submit" className="signup-button">
          Register
        </button>
      </div>
    </form>
  </div>
  );
}


export default RegisterForm;
