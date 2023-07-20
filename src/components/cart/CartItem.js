import React from "react";
import styles from "./CartItem.module.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const decrQtyInnCart = (e) => {
    e.preventDefault();
    dispatch(cartActions.removeFromCart(item.product.id));
  };
  const incrQtyInnCart = (e) => {
    e.preventDefault();
    dispatch(cartActions.addToCart({ pdata: item.product, quantity: 1 }));
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
