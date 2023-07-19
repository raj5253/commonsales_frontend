import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotLogedIn.module.css";

const NotLogedIn = () => {
  return (
    <>
      <div className={styles.errorBlock}>
        <p className={styles.error}>You are not logged in!</p>
        <p className={styles.mssg}>
          Please{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <b> login </b>
          </Link>
        </p>
      </div>
    </>
  );
};

export default NotLogedIn;
