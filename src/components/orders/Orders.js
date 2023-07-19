import axios from "axios";
import React, { useEffect, useState } from "react";
import { useJwt, decodeToken, isExpired } from "react-jwt";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Order from "./Order";
import NotLogedIn from "../shared/NotLogedIn";

import styles from "./Orders.module.css";

const Orders = () => {
  const token = localStorage.getItem("token");
  // const { decodedToken, isExpired } = useJwt(token);//getting errors when not loged in. conditinal use not allowed as its a hook. So use fucntions
  const user = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // if (!token) {
  //   navigate("/login");
  // }

  const [fetchedOrder, setFetchedOrders] = useState(null);
  const BASE_URL = process.env.REACT_APP_SERVER_URL;
  //here
  useEffect(() => {
    let data;
    const fetchOrder = async () => {
      const resp = await fetch(`${BASE_URL}/orders`, {
        headers: {
          "x-access-token": localStorage.getItem("token"), //when token is not, there still useEffectwill call server.such req should b handled at server site.
        },
      });
      data = await resp.json();
      if (data.status === "ok") {
        // console.log(data.mssg);
      }
      setFetchedOrders(data.orders);
      console.log(data);
    };
    try {
      fetchOrder();
      // console.log(fetchedOrder); //was very much usefull
      if (fetchedOrder?.status === "error") {
        console.log(data.mssg);
      }
    } catch (error) {
      console.log("failed in fetching order! from backend!", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.orderContainer}>
      <h1>Orders</h1>
      {!token && <NotLogedIn />}
      <div>
        {fetchedOrder && (
          <ul className={styles.orderList}>
            {fetchedOrder.map((order) => {
              return (
                <li className={styles.listItem} key={order.id}>
                  <Order props={order} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {fetchedOrder?.length === 0 && (
        <div>
          <h2>{"You"}</h2>
          <p>
            <Link to="/">view products !</Link>
          </p>
        </div>
      )}
      {/* {console.log(user)}  */} {/* debug */}
    </div>
  );
};

export default Orders;

//  {console.log(myDecodedToken)} <-- decode form of token, stored in localstorage.
// {console.log(user)} <-- which is sored in reduxstorre

// for using  <li key={order.id}>, you check the order structure by console.log
// console hi to karte rehna hai hamesha
