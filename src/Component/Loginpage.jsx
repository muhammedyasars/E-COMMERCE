import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { newcontext } from "../Context/Context";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const { setname, setislogged } = useContext(newcontext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setUsers(res.data);
  };

  useState(() => {
    fetchUsers();
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );
  
    if (!user) {
      if (window.confirm("Invalid User,You want to SignUp?")) {
        localStorage.clear();
        setname(null);
        setislogged(false);
        navigate("/Register");
      }
      return;
    }
  
    if (user.block === true) {
      alert("Blocked user");
      return;
    }
  
    alert("Login successful");
    setislogged(true);
    setname(user.username);
    localStorage.setItem("id", user.id);
    localStorage.setItem("name", user.username);
    localStorage.setItem("role", user.role);
    navigate(user.role === "admin" ? "/admin" : "/");
  };

  return (
    <div className="login-page">
      <button className="btn baby-back-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
      <div className="login-container">
        <h2 className="text-center mb-4 baby-title">Welcome Back!</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="p-4 shadow-lg baby-login-form">
            <div className="mb-3">
              <label htmlFor="email" className="form-label baby-label">
                Email
              </label>
              <Field type="email" id="email" name="email" className="form-control baby-input" />
              <ErrorMessage name="email" component="div" className="text-danger mt-1" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label baby-label">
                Password
              </label>
              <Field type="password" id="password" name="password" className="form-control baby-input" />
              <ErrorMessage name="password" component="div" className="text-danger mt-1" />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn baby-btn">
                Login
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="small-text">
                Don't have an account?{" "}
                <a href="/Register" className="baby-signup-link">
                  Sign Up
                </a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
