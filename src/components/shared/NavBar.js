import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NavBar.module.css";
import { authActions } from "../../store/authSlice";
import { cartActions } from "../../store/cartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  // const token = auth.user;
  const isAdmin = auth.isAdmin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);
  const handleOnClick = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("cart");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("token");

      dispatch(
        cartActions.replaceData({ items: [], totalPrice: 0, totalQuantity: 0 })
      );
      dispatch(authActions.logout());

      navigate("/login");

      // update state of redux for auth
      // update the localstorage also.
    } catch (error) {
      console.log("error while loging you out");
    }
  };
  return (
    <>
      <nav className={styles.navContainer}>
        <>
          {/* <img src="./newlogo.png" alt="" width={200} height={50} /> */}
          {/* <div className={styles.logo}> */}
          <Link to="/" className={styles.icon}>
            Common Sales
          </Link>
          {/* </div> */}

          <div>
            <ul
              id={styles.navbar}
              className={
                clicked ? styles.navbar + " " + styles.active : styles.navbar
              }
            >
              {isAdmin && (
                <>
                  <li>
                    <Link className={styles.navItem} to="/admin/manageProducts">
                      Manage Products🏬
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.navItem} to="/admin/manageOrders">
                      Manage orders📦
                    </Link>
                  </li>
                </>
              )}
              {!isAdmin && (
                <>
                  <li>
                    <Link
                      // className={styles.navItem + " " + styles.active}
                      className={styles.navItem}
                      to="/cart"
                    >
                      Cart
                      <ShoppingCartIcon />
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.navItem} to="/orders">
                      Orders📦
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link className={styles.navItem} to="/profile">
                  Profile👤
                </Link>
              </li>
              {!auth.isLoggedIn && (
                <li>
                  <Link className={styles.navItem} to="/login">
                    Login
                  </Link>
                </li>
              )}
              {auth.isLoggedIn && (
                <li>
                  <Link className={styles.navItem} onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div id={styles.mobile} onClick={handleOnClick}>
            {/* {clicked && ( */}
            <i>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </i>
            {/* )}
            {!clicked && (
              <i>
                <div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </i>
            )} */}
            {/* <i className={clicked ? "fas fa-time" : "fas fa-bar"}>⬜</i> */}
          </div>
        </>
      </nav>
    </>
  );
};

export default NavBar;
