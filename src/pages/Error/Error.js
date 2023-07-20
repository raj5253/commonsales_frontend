import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Error.module.css";

const Error = (props) => {
  const location = useLocation();
  if (location.state) {
    const state = location.state;
    const { mssg, code } = state;

    return (
      <div className={styles.container}>
        <p className={styles.error}> Error {code}</p>
        <p className={styles.notfiy}>You got an error.</p>
        <p className={styles.mssg}>{mssg} </p>
      </div>
    );
  } else if (props) {
    // when props are there
    const { mssg, code } = props;
    return (
      <div className={styles.container}>
        <p className={styles.error}> Error {code}</p>
        <p className={styles.notfiy}>You got an error.</p>
        <p className={styles.mssg}>{mssg} </p>
      </div>
    );
  }
};

//navigate("/error", {
//   state: { mssg: "could not connect to the server", code: "503" },
// });

export default Error;
