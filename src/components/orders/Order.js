import React from "react";
import styles from "./Order.module.css";

const Order = ({ props }) => {
  const formattedDate = props?.formattedDate; //according to what you get in console.log, don't check database, will take too much time.
  const id = props?.id;
  const status = props?.status;
  const items = props?.productData?.items;
  const totalPrice = props?.productData?.totalPrice;
  const totalQuantity = props?.productData?.totalQuantity;

  // console.log(props); //debug -> finding keys in props
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>{formattedDate}</div>
        <div className={styles.invoice}>
          Invoice
          <i>#{id}</i>
        </div>
        <div className={styles.parentStatus}>
          <span className={styles.status}> {status} </span>
        </div>
      </div>
      <ul className={styles.orderItems}>
        {items &&
          items.map((item, i) => {
            return (
              <li key={i + 101}>
                <span>{item.product.title}</span>
              </li>
            );
          })}
        {items?.length === 0 && <li>No items!</li>}
      </ul>
      <p className={styles.address}>
        shipped to : {props?.userData.address.city} -{" "}
        <i>{props?.userData.address.postal}</i>
      </p>
      <h5 className={styles.totlprc}>totalPrice : ₹ {totalPrice}</h5>
    </div>
  );
};

export default Order;

// when "oder" used instead of "props", itdidn't worked at all.
// everyhting was undefined.
