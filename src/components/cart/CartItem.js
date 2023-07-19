import React from "react";
import styles from "./CartItem.module.css";
import { Button } from "@mui/material";

const CartItem = ({ item }) => {
  const decrQtyInnCart = (e) => {
    e.preventDefault();
  };
  const incrQtyInnCart = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.itemContainer}>
      <div>{item.product.title}</div>
      <div>
        <span> ₹{item.product.price} </span>
      </div>
      <div>
        <Button onClick={incrQtyInnCart} variant="contained" color="success">
          <b>+</b>
        </Button>
        <span> x {item.quantity} </span>
        <Button onClick={decrQtyInnCart} variant="contained" color="success">
          <b>-</b>
        </Button>
      </div>
      <div>
        <b>₹{item.totalPrice}</b>
      </div>
    </div>
  );
};

export default CartItem;
