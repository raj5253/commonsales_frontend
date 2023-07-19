import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";

import styles from "./Signup.module.css";

const validate = (values) => {
  const errors = {};
  if (!values.fullname) {
    errors.fullname = "Required";
  } else if (values.fullname.length > 25) {
    errors.fullname = "Must be 25 characters or less";
  }

  if (!values.postal) {
    errors.postal = "Required";
  } else if (values.postal.length !== 6) {
    errors.postal = "Must be of 6 digits";
  }

  if (!values.street) {
    errors.street = "Required";
  } else if (values.street.length > 20) {
    errors.street = "Must be 20 characters or less";
  }

  if (!values.city) {
    errors.city = "Required";
  } else if (values.city.length > 25) {
    errors.city = "Must be 25 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "must be of 8 to 20 characters";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.confirmEmail) {
    errors.confirmEmail = "Required";
  } else if (values.confirmEmail !== values.email) {
    errors.confirmEmail = "should me same as email";
  }

  return errors;
};

const Signup = () => {
  const [serror, setSerror] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      confirmEmail: "",
      password: "",
      fullname: "",
      postal: "",
      street: "",
      city: "",
    },
    validate,
    onSubmit: async (values) => {
      setSerror("");
      const BASE_URL = process.env.REACT_APP_SERVER_URL;

      const res = await fetch(`${BASE_URL}/signup`, {
        headers: {
          "content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "error") {
        setSerror(data.mssg);
      } else {
        navigate("/login");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h2>Signup</h2>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className={styles.error}>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="confirmEmail">confirmEmail Address</label>
      <input
        id="confirmEmail"
        name="confirmEmail"
        type="confirmEmail"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmEmail}
      />
      {formik.touched.confirmEmail && formik.errors.confirmEmail ? (
        <div className={styles.error}>{formik.errors.confirmEmail}</div>
      ) : null}

      <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className={styles.error}>{formik.errors.password}</div>
      ) : null}

      <label htmlFor="name">fullname</label>
      <input
        id="fullname"
        name="fullname"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.fullname}
      />
      {formik.touched.fullname && formik.errors.fullname ? (
        <div className={styles.error}>{formik.errors.fullname}</div>
      ) : null}

      <label htmlFor="postal">Postal</label>
      <input
        id="postal"
        name="postal"
        type="string"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.postal}
      />
      {formik.touched.postal && formik.errors.postal ? (
        <div className={styles.error}>{formik.errors.postal}</div>
      ) : null}

      <label htmlFor="street">Street</label>
      <input
        id="street"
        name="street"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.street}
      />
      {formik.touched.street && formik.errors.street ? (
        <div className={styles.error}>{formik.errors.street}</div>
      ) : null}

      <br />
      <label htmlFor="city">City</label>
      <br />
      <input
        id="city"
        name="city"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.city}
      />

      {formik.touched.street && formik.errors.street ? (
        <div className={styles.error}>{formik.errors.street}</div>
      ) : null}

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>

      {serror && <p>{serror}</p>}

      <p>
        Already have account? <Link to="/login">login</Link>
      </p>
    </form>
  );
};

export default Signup;
