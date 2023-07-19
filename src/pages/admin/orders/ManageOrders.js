import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Order from "./Order";

import styles from "./ManageOrders.module.css";
const ManageOrders = () => {
  const [fetchedOrder, setFetchedOrder] = useState(null);
  const token = useSelector((state) => state.auth).user;

  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/orders`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFetchedOrder(res.data.orders); //check backend for what data_structure you send
      })
      .catch((err) => {
        console.log("could fetch orders for admin", err);
      });
  }, []);

  return (
    <div className={styles.orderContainer}>
      <h1>Orders</h1>

      <div>
        {fetchedOrder && (
          <ul className={styles.orderList}>
            {fetchedOrder?.map((order) => {
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
    </div>
  );
};

export default ManageOrders;

//axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
