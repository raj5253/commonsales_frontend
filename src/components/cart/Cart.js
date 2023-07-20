import React, { useEffect, useState } from "react";
// import { decodeToken, isExpired } from "react-jwt";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import { Button } from "@mui/material";
import NotLogedIn from "../shared/NotLogedIn";
import axios from "axios";

// cart data gets stored in local storage
const Cart = () => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const [fetchedCart, setFetchedCart] = useState("");
  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  // actual part begins::
  useEffect(() => {
    let data;
    axios
      .get(`${BASE_URL}/cart`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          // setFetchedCart(data.cart);
          setFetchedCart("ok");
        }
      })
      .catch((error) => {
        console.log("failed in fetching order! from backend!", error);
        navigate("/error", {
          state: { mssg: "could not connect to the server", code: "503" },
        });
      });
  }, []);

  const placeOrders = () => {
    //now i will use this.
    navigate("/placeorder");
  };
  return (
    <div className={styles.container}>
      <h1>Your Cart</h1>

      {!token && <NotLogedIn />}

      {token && fetchedCart && (
        <section className={styles.cartContainer}>
          {cart.totalQuantity > 0 && (
            <ul>
              <section>
                {cart.items.map((item, i) => {
                  return (
                    <li key={i}>
                      <CartItem item={item} />
                    </li>
                  );
                })}
                <div className={styles.conclusion}>
                  <div>
                    <div className={styles.imp}>
                      <div>totalQuantity :</div> <div>{cart.totalQuantity}</div>
                    </div>
                    <div className={styles.imp}>
                      <div> totalPrice :</div> <div> ₹ {cart.totalPrice} </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className={styles.orderBtn}>
                  <Button variant="contained" onClick={placeOrders}>
                    Place Order
                  </Button>
                </div>
              </section>
            </ul>
          )}
          {cart.totalQuantity === 0 && (
            <div style={{ textAlign: "center", paddingTop: "1rem" }}>
              <h3>{"Your cart is empty"}</h3>
              <p>
                <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
                  view products !
                </Link>
              </p>
            </div>
          )}
        </section>
      )}
      {
        // console.log(cart) // debug -> latest value displayed
      }
    </div>
  );
};
export default Cart;

// And if you fail to offer a cross-device shopping cart, you may miss out on sales and lose customers.
// Take Away: Cross-Device Support is Now Essential
