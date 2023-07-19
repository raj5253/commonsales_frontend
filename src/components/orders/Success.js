import React from "react";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div>
      <h2>Your order is placed successfully</h2>
      <p>
        You can track your order in : <Link to="/orders">Myorder</Link>
      </p>
    </div>
  );
};

export default Success;
