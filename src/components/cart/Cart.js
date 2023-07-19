import React, { useEffect, useState } from "react";
// import { decodeToken, isExpired } from "react-jwt";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import { Button } from "@mui/material";
import NotLogedIn from "../shared/NotLogedIn";

// cart data gets stored in local storage
const Cart = () => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  // if (token === undefined) {
  //   alert("token is not there");
  //   navigate("/login");
  // }
  const [fetchedCart, setFetchedCart] = useState(null);
  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  // actual part begins::
  useEffect(() => {
    let data;
    const fetchCart = async () => {
      const resp = await fetch(`${BASE_URL}/cart`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      data = await resp.json();
      if (data.status === "ok") {
        setFetchedCart(data.cart);
      }
      // console.log(data);  //debug
    };
    try {
      fetchCart();
      // console.log(cart); // debug
    } catch (error) {
      console.log("failed in fetching order! from backend!", error);
      return;
    }
  }, [cart, user]);

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: {
          "content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        method: "POST",
        body: JSON.stringify(cart),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("failed in placing your order!", error);
      navigate("/failure");
    }
  };

  const placeOrders = () => {
    //now i will use this.
    navigate("/placeorder");
  };
  return (
    <div className={styles.container}>
      <h1>Your Cart</h1>

      {!token && <NotLogedIn />}

      {token && (
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
          {!cart.totalQuantity && (
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
