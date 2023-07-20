import React from "react";
import { Link } from "react-router-dom";
const Failure = () => {
  return (
    <div style={{ textAlign: "center", paddingTop: "3rem" }}>
      <h2>Oops! your transaction failed.</h2>
      <h2>Failed to place your order.</h2>
      <p>
        You can go back to cart : <Link to="/cart">My Cart</Link>
      </p>
    </div>
  );
};

export default Failure;
