import React from 'react';
import { useFormik } from "formik";
import axios, {AxiosError} from "axios";
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

function RegisterForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signIn = useSignIn();
  const onSubmit = async(values) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        values,
        {
          headers: {"Access-Control-Allow-Origin": true}
        },
      );
      signIn({
        token: response.data.token,
        expiresIn: 1440, //cookie expires after 1 day
        tokenType: "Bearer",
        authState: {email: values.email},
      });
      navigate("/");

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