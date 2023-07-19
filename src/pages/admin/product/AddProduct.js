import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import ImgPreview from "./ImgPreview";
import axios from "axios";

import styles from "./AddProduct.module.css";
import { useSelector } from "react-redux";

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  } else if (values.title.length > 50) {
    errors.fullname = "Must be 50 characters or less";
  }

  if (!values.summary) {
    errors.summary = "Required";
  } else if (values.summary.length > 100) {
    errors.summary = "Must be of less than 100 characters";
  }

  if (!values.description) {
    errors.description = "Required";
  } else if (values.description.length > 200) {
    errors.description = "Must be 200 characters or less";
  }

  if (!values.price) {
    errors.price = "Required";
  } else if (values.price < 50) {
    errors.price = "Must be greater than Rs.50";
  }
  if (!values.image) {
    errors.image = "Required"; //image size < 1MB
  } else if (values.image.size > 1024 * 1024) {
    errors.image = "Too big file ";
  }

  return errors;
};

const AddProduct = () => {
  const [serror, setSerror] = useState("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      price: "",
      description: "",
      image: "",
    },
    validate,
    onSubmit: (values) => {
      // console.log(formik.values.image, "<---");
      setSerror("");

      let formdata = new FormData();
      formdata.append("title", values.title);
      formdata.append("summary", values.summary);
      formdata.append("price", values.price);
      formdata.append("description", values.description);
      formdata.append("image", values.image, values.image.name);
      formdata.append("hello", "oooo");

      console.log(...formdata);
      const BASE_URL = process.env.REACT_APP_SERVER_URL;

      axios
        .post(`${BASE_URL}/admin/products`, formdata, {
          headers: {
            "x-access-token": auth.user, //token
            // "Content-Type": "multipart/form-data", //cant use bc you need boundary for it.
          },
        })
        .then((res) => {
          if (res?.data?.status !== "ok") {
            setSerror(res?.data?.mssg);
            console.log(res.data);
          } else if (res?.data?.status === "ok") {
            setSerror("");
            console.log(res.data);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("error in submit new product", err);
        });

      // console.log(formik.values);
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className={styles.form}
      >
        <h2>New Product</h2>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          // onChange={formik.handleChange}  //handleChange provided by formik can't capture image
          onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
          onBlur={formik.handleBlur}
          // value={formik.values.image}  And then trying to set the value of the file input, which you can't do. HTML specs won't allow you to set a value on file inputs. Only the user can select a file to upload and you can't set it for them.// You can show their pic as a regular image on this edit form, with a file input next to it in case they want to change it.
        />
        {formik.touched.image && formik.errors.image ? (
          <div className={styles.error}>{formik.errors.image}</div>
        ) : null}
        {formik.values.image && <ImgPreview file={formik.values.image} />}

        <label htmlFor="title"> title </label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className={styles.error}>{formik.errors.title}</div>
        ) : null}

        <label htmlFor="summary"> summary </label>
        <input
          id="summary"
          name="summary"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.summary}
        />
        {formik.touched.summary && formik.errors.summary ? (
          <div className={styles.error}>{formik.errors.summary}</div>
        ) : null}

        <label htmlFor="description">description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className={styles.error}>{formik.errors.description}</div>
        ) : null}

        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <div className={styles.error}>{formik.errors.price}</div>
        ) : null}

        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Product
        </Button>

        {serror && <p>{serror}</p>}
      </form>
    </>
  );
};

export default AddProduct;
