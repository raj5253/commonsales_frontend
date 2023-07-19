import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.css";

const ProductItem = ({ props }) => {
  //item itself was an object,
  const { discription, id, image, imageUrl, price, summary, title } = props;

  return (
    <Link
      to={`/products/${id}`}
      // state={props} //not needed now, you prefetch per product page// Pro
      style={{ textDecoration: "none" }}
      className={styles.itemContainer}
    >
      <div className={styles.item}>
        <div className={styles.prodImg}>
          <img src={imageUrl} alt={id} height={200} width={200} />
        </div>
        <div className={styles.prodContent}>
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
