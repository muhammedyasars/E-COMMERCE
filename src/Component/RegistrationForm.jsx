import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Register.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";


const RegistrationForm = () => {
  const Navigate = useNavigate()
  
  const handleSubmit = async (values) => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;
  
      const emailExists = users.some(user => user.email === values.email);
  
      if (emailExists) {
        alert("This email is already registered. Please use a different email.");
        return; 
      }
  
      await axios.post('http://localhost:3000/users', values);
      alert('Registration successful!');
      Navigate('/Loginpage');
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };
  

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Initial values for the form
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    cart:[],
    order:[],
    block:false
  };


  // Submit handler


  return (
    <div className="registration-page">
      <button
        className="btn baby-back-btn"
        onClick={() => Navigate("/")}
      >
        Back to Home
      </button>

      <div className="registration-container">
        <h2 className="text-center mb-4 baby-title">Create an Account</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="p-4 shadow-lg baby-registration-form">
              {/* Username Field */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label baby-label">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="form-control baby-input"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label baby-label">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control baby-input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label baby-label">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control baby-input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label baby-label">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control baby-input"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>

              {/* Register Button */}
              <div className="d-grid">
                <button type="submit" className="btn baby-btn" >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
