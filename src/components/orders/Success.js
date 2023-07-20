import { create } from "@mui/material/styles/createTransitions";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Success.module.css";
const Success = () => {
  const location = useLocation();
  let amount, created, currency, id, receipt_email;
  let paymentdate = "";
  if (location.state) {
    ({ amount, created, currency, id, receipt_email } = location.state);

    var date = new Date(parseInt(created) * 1000);
    created = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
  console.log(location);
  return (
    <div>
      {location.state && (
        <div className={styles.container}>
          <h2>Your order is placed successfully🎉</h2>
          <div className={styles.detail}>
            <p>
              amount{" : "}
              <span>
                <b>
                  {amount} {currency}
                </b>
              </span>
            </p>
            <p>
              payment date : <span>{created}</span>
            </p>
            <p>
              payment id : #<span>{id}</span>
            </p>
          </div>
          <p>
            You can track your order in : <Link to="/orders">Myorder</Link>{" "}
          </p>
          <div />
        </div>
      )}

      {!location.state && (
        <div style={{ textAlign: "center", color: "red", padding: "1rem" }}>
          <p>You should not be here, unless you have placed any order</p>
        </div>
      )}
    </div>
  );
};

export default Success;
