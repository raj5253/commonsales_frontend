import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    // update state of redux for auth
    // update the localstorage also.
  };
  return (
    <div>
      <div>
        <div>
          <Link to="/">Common Sales</Link>
        </div>
        <div>
          <li>
            <Link to="/deals">Deals</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
